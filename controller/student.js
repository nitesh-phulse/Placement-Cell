// Import necessary modules and models
const validator = require('validator');
const objectsToCsv = require('objects-to-csv');
const Student = require('../models/student');
const Interview = require('../models/interview');
const Result = require('../models/result');
const fs = require('fs');

// Employee dashboard - List of students
module.exports.dashboard = async function (req, res) {
  try {
    // Retrieve a list of students from the database
    const studentList = await Student.find({});
    
    // Render the 'employeeDashboard' view with the student list
    return res.render('employeeDashboard', {
      title: "Employee Dashboard",
      studentList: studentList
    });
  } catch (error) {
    return res.send('<h1>Error in loading employee dashboard</h1>'); // Display an error message if there's an issue
  }
};

// Add student page
module.exports.addStudentPage = async function (req, res) {
  return res.render('addStudent', {
    title: "Add Student"
  });
};

// Handle adding a new student
module.exports.addStudent = async function (req, res) {
  try {
    // Validate the email address
    if (!validator.isEmail(req.body.email)) {
      req.flash('error', 'Enter a valid Email !!');
      return res.redirect('back');
    } else {
      // Check if the student with the same email already exists
      const presentStudent = await Student.findOne({ email: req.body.email });
      if (presentStudent) {
        req.flash('error', 'Student Already Present!!');
        return res.redirect('back');
      } else {
        // Create a new student record in the database
        const addStudent = await Student.create(req.body);
        req.flash('success', 'Student Added Successfully !!');
        return res.redirect('/employee/dashboard');
      }
    }
  } catch (error) {
    return res.send('Error in adding student');
  }
};

// Download student data in CSV format
module.exports.downloadData = async function (req, res) {
  try {
    // Retrieve a list of students from the database
    const studentList = await Student.find({});
    const dataPresent = [];

    for (let i = 0; i < studentList.length; i++) {
      const student = studentList[i];

      for (let j = 0; j < student.interviews.length; j++) {
        const id = student.interviews[j];
        const interviewData = await Interview.findById(id);

        // Find result
        let result = "On Hold";
        const resultIndex = interviewData.result.indexOf(student.id);

        if (resultIndex !== -1) {
          const resultData = await Result.find({ studentId: interviewData.result[resultIndex] });

          for (let k = 0; k < resultData.length; k++) {
            if (resultData[k].interviewId == interviewData.id) {
              result = resultData[k].result;
              break;
            }
          }
        }

        // Create an object representing student data for CSV export
        const list = {
          StudentId: student.id,
          Batch: student.batch,
          Name: student.name,
          Email: student.email,
          Status: student.status,
          College: student.college,
          DSA: student.DSA_FinalScore,
          WEBD: student.WebD_FinalScore,
          REACT: student.React_FinalScore,
          CompanyName: interviewData.companyName,
          InterviewDate: interviewData.date.toString().substring(4, 15),
          Result: result
        };

        dataPresent.push(list);
      }
    }

    // Convert the data to a CSV file using the 'objects-to-csv' library
    const csv = new objectsToCsv(dataPresent);
    const filePath = './studentData.csv';

    // Save the CSV file to disk
    await csv.toDisk(filePath);

    // Trigger a file download response, and delete the file after download
    return res.download(filePath, () => {
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    return res.send('Error in downloading student data');
  }
};

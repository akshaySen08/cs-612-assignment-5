const express = require('express');
const mongoose = require('mongoose');

const Student = require('../models/studentdata.js');

const router = express.Router();

const getStudents = async (req, res) => {
    try {
        const student = await Student.find();

        Student.find().then(students => {
            res.render('students-list',
                {
                    students,
                    pageTitle: 'Students',
                    path: '/students',
                })
        }).catch(err => console.log({ err }))
        return
        // res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getspecStudent = async (req, res) => {
    const uid = req.params.uid;

    try {
        const stud = await Student.findOne({ uid: uid });

        res.render('student-details',
            {
                stud,
                pageTitle: stud.name.toUpperCase(),
                path: `/students/${stud.uid}`,
            })
        return
        res.status(200).json(stud);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* For getting student subjects */
const getStuSubjects = async (req, res) => {
    const uid = req.params.uid;

    // const student = await Student.find();

    await Student.findOne({ uid }).then(student => {
        res.render('student-subjects',
            {
                subjects: student.subjects,
                student,
                pageTitle: `Subjects - ${student.name.toUpperCase()}`,
                path: `/students/${student.uid}/subjects`,
            })
    }).catch(err => console.log({ err }))
    return
}

/* get students subject marks */
const getStuSubjectMarks = async (req, res) => {
    const {
        uid,
        index
    } = req.params

    await Student.findOne({ uid }).then(student => {
        res.render('marks',
            {
                subject: student.subjects[index],
                marks: student.marks[index],
                student,
                pageTitle: `Subjects - Marks - ${student.name.toUpperCase()}`,
                path: `/students/${student.uid}/subjects/${index}/marks`,
            })
    }).catch(err => console.log({ err }))
    return
}

/* For creating a student */
const createstudent = async (req, res) => {
    console.log(req.body);
    exist = await Student.exists({ uid: req.body.uid });
    console.log({
        exist
    });
    if (exist) {
        return res.status(400).json({ message: "Student already exists" });
    }

    const newstudent = new Student({
        name: req.body.name,
        uid: req.body.uid,
        semester: req.body.semester,
        subjects: req.body.subjects.split(','),
        term: req.body.term,
        marks: req.body.marks.split(',')
    })
    try {
        await newstudent.save();

        res.status(201).json(newstudent);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const updatestudent = async (req, res) => {
    const uid = req.params.uid;
    try {
        await Student.findOneAndUpdate({
            uid: uid,
        },
            req.body
        )
        res.status(202).json({ uid: uid });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}

const deletestudent = async (req, res) => {
    const uid = req.params.uid;

    try {
        await Student.findOneAndRemove({ uid: uid });
        res.status(203).json({ uid: uid });

    } catch (error) {
        res.status(402).json({ message: error.message });
    }
}

module.exports.getStudents = getStudents;
module.exports.createstudent = createstudent;
module.exports.getspecStudent = getspecStudent;
module.exports.updatestudent = updatestudent;
module.exports.deletestudent = deletestudent;

module.exports.getStuSubjects = getStuSubjects;
module.exports.getStuSubjectMarks = getStuSubjectMarks;
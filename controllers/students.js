const express = require('express');
const mongoose = require('mongoose');
const { getJsonData } = require('./data-provider');
const data = require('./json-data.json');
// const Student = require('../models/studentdata.js');


const router = express.Router();

const getStudents = async (req, res) => {
    try {
        const students = await data;

        res.render('students-list',
            {
                students,
                pageTitle: 'Students',
                path: '/students',
                stud: null,
                index: 0
            })
        return
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getspecStudent = async (req, res) => {
    const uid = req.params.uid;

    try {
        // const stud = await Student.findOne({ uid: uid });
        const stud = data.filter(stu => +stu.uid == uid)[0];
        console.log({ stud: stud });
        res.render('student-details',
            {
                stud: stud,
                pageTitle: stud.name.toUpperCase(),
                path: `/students/${stud.uid}`,
                index: 0
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
    const student = data.filter(stu => +stu.uid == uid)[0];
    res.render('student-subjects',
        {
            subjects: student.subjects,
            student,
            pageTitle: `Subjects - ${student.name.toUpperCase()}`,
            path: `/students/${student.uid}/subjects`,
            stud: student,
            index: 0
        })
    return
}

/* get students subject marks */
const getStuSubjectMarks = async (req, res) => {
    const {
        uid,
        index
    } = req.params

    const student = data.filter(stu => +stu.uid == uid)[0];
    res.render('marks',
        {
            subject: student.subjects[index],
            marks: student.marks[index],
            student,
            stud: student,
            pageTitle: `Subjects - Marks - ${student.name.toUpperCase()}`,
            path: `/students/${student.uid}/subjects/${index}/marks`,
            index
        })
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
const express = require('express');
const mongoose = require('mongoose');
const { getJsonData } = require('./data-provider');
const data = require('./json-data.json');
// const Customer = require('../models/customerdata.js');


const router = express.Router();

const getStudents = async (req, res) => {
    try {
        const customers = await data;

        res.render('customers-list',
            {
                customers,
                pageTitle: 'Customers',
                path: '/customers',
                cust: null,
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
        // const cust = await Customer.findOne({ uid: uid });
        const cust = data.filter(stu => +stu.uid == uid)[0];
        console.log({ cust: cust });
        res.render('customer-details',
            {
                cust: cust,
                pageTitle: cust.name.toUpperCase(),
                path: `/customers/${cust.uid}`,
                index: 0
            })
        return
        res.status(200).json(cust);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* For getting customer orders */
const getStuSubjects = async (req, res) => {
    const uid = req.params.uid;

    // const customer = await Customer.find();
    const customer = data.filter(stu => +stu.uid == uid)[0];
    res.render('customer-orders',
        {
            orders: customer.orders,
            customer,
            pageTitle: `Subjects - ${customer.name.toUpperCase()}`,
            path: `/customers/${customer.uid}/orders`,
            cust: customer,
            index: 0
        })
    return
}

/* get customers order marks */
const getStuSubjectMarks = async (req, res) => {
    const {
        uid,
        index
    } = req.params

    const customer = data.filter(stu => +stu.uid == uid)[0];
    res.render('marks',
        {
            order: customer.orders[index],
            marks: customer.marks[index],
            customer,
            cust: customer,
            pageTitle: `Subjects - Marks - ${customer.name.toUpperCase()}`,
            path: `/customers/${customer.uid}/orders/${index}/marks`,
            index
        })
    return
}

/* For creating a customer */
const createcustomer = async (req, res) => {
    console.log(req.body);
    exist = await Customer.exists({ uid: req.body.uid });
    console.log({
        exist
    });
    if (exist) {
        return res.status(400).json({ message: "Customer already exists" });
    }

    const newcustomer = new Customer({
        name: req.body.name,
        uid: req.body.uid,
        semester: req.body.semester,
        orders: req.body.orders.split(','),
        term: req.body.term,
        marks: req.body.marks.split(',')
    })
    try {
        await newcustomer.save();

        res.status(201).json(newcustomer);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const updatecustomer = async (req, res) => {
    const uid = req.params.uid;
    try {
        await Customer.findOneAndUpdate({
            uid: uid,
        },
            req.body
        )
        res.status(202).json({ uid: uid });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}

const deletecustomer = async (req, res) => {
    const uid = req.params.uid;

    try {
        await Customer.findOneAndRemove({ uid: uid });
        res.status(203).json({ uid: uid });

    } catch (error) {
        res.status(402).json({ message: error.message });
    }
}

module.exports.getStudents = getStudents;
module.exports.createcustomer = createcustomer;
module.exports.getspecStudent = getspecStudent;
module.exports.updatecustomer = updatecustomer;
module.exports.deletecustomer = deletecustomer;

module.exports.getStuSubjects = getStuSubjects;
module.exports.getStuSubjectMarks = getStuSubjectMarks;
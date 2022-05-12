const express = require("express");

const  customer_Act = require("../controllers/customers"); 

const router = express.Router();

router.get('/', customer_Act.getStudents); 
router.get('/:uid', customer_Act.getspecStudent); 
router.get('/:uid/orders', customer_Act.getStuSubjects) 
router.get('/:uid/orders/:index/marks', customer_Act.getStuSubjectMarks) /*  */

router.post('/', customer_Act.createcustomer);

router.patch('/:uid', customer_Act.updatecustomer);
router.delete('/:uid', customer_Act.deletecustomer);

module.exports=router;
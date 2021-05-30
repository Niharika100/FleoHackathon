const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Child = require('../models/Child');

router.post('/company/addTarget', (req, res, next) => {
    const {
        name,
        parent,
        target_sale,
        total_sale
    } = req.body;

    const target = Child.create(
        {
            name: name,
            parent: name,
            target_sale: target_sale,
            total_sale: total_sale
        }
    )
    console.log(target);

    const company_detail = Company.find({
        name: parent
    }).then((company) => {
        return company
    }).catch(next);
    if (company_detail) {
        Company.findOneAndUpdate({
            _id: company_detail.id,
        },
            {
                $push: {
                    children: [...target._id]
                }
            }
        )
    }
    else {
        Company.create(
            {
                name: parent,
                total_sale: total_sale,
                target_sale: target_sale,
                children: [...req.body]
            }
        ).then(res => console.log(res))
            .catch(err => console.log(err))
    }
});

//update request
router.put('/company/updateSale', (req, res, next) => {
    const {
        id
    } = req.query;
    Company.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true })
        .then((Company) => {
            UpdateParent(Company)
        })
        .catch(next);

    function UpdateParent(parentDetail) {

        const detail = Company.findById(parentDetail._id).populate({
            path: children._id,
            model: Child
        }).catch(next);
        let target = 0, total = 0;
        for (let i = 0; i < detail.children; i++) {
            target += detail.children[i].target_sale;
            total += detail.children[i].total_sale;
        }
        Company.findOneAndUpdate(
            {
                _id: parentDetail._id
            },
            {
                target_sale: target,
                total_sale: total,
            },
            { new: true }
        ).catch(next);
    }
});

module.exports = router;
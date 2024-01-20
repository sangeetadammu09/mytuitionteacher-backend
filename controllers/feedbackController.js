const Joi = require('joi');
const Feedback = require('../models/Feedback');
const Teacher = require('../models/Teacher');


exports.feedbackcreate = async (req, res) => {
    const schema = Joi.object({
        parentid: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
        tuition: Joi.string().required(),
        teacherid: Joi.string().required(),
        rating: Joi.string().required(),
        comment: Joi.string().required(),
        isActive: Joi.boolean().required()
    })

    //console.log(req.body,'request')
    try {
        await schema.validateAsync(req.body);
        let payload = req.body;

        await Feedback.create(payload, (err, data) => {
            if (err) throw err
            return res.status(200).json({ 'message': 'Feedback created successfully', 'data': data, 'status': 200 });
        })

    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//list of feedback by page
exports.listoffeedbacks = async (req, res) => {
    var pageNo = parseInt(req.body.startNumber)
    var size = parseInt(req.body.pageSize)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size;
    // console.log(query,'query')
    try {
        await Feedback.find({}, {}, query, (err, data) => {
            if (err) throw err
            data.sort((a, b) => {
                return new Date(b.creation_dt) - new Date(a.creation_dt);
            });

            data.forEach(x => {
            if(x.teacherid){
             Teacher.findOne({ _id: x.teacherid },(err, resp)=>{
                if(err)throw err
                x['teacher'] = resp;           
            })     
            }

            })

            Feedback.countDocuments({}, (count_error, count) => {
                if (err) {
                    return res.json(count_error);
                }
                return res.json({
                    'message': 'Feedbacks Fetched Successfully',
                    total: count,
                    page: pageNo,
                    pageSize: data.length,
                    'data': data,
                    status: 200
                });
            });

        })

    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//list of feedback by parent id
exports.feedbacklistbyparentid = async (req, res) => {
    var pageNo = parseInt(req.body.startNumber)
    var size = parseInt(req.body.pageSize)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size;
    // query.parentid = req.params.parentid;
    try {
        await Feedback.find({ parentid: req.params.id }, {}, query, (err, data) => {
            if (err) throw err
            data.sort((a, b) => {
                return new Date(b.creation_dt) - new Date(a.creation_dt);
            });

            data.forEach(x => {
                if(x.teacherid){
                 Teacher.findOne({ _id: x.teacherid },(err, resp)=>{
                    if(err)throw err
                    x['teacher'] = resp;           
                })     
                }
                
                })

            Feedback.countDocuments({}, (count_error, count) => {
                if (err) {
                    return res.json(count_error);
                }
                return res.json({
                    'message': 'Feedbacks Fetched Successfully',
                    total: count,
                    page: pageNo,
                    pageSize: data.length,
                    'data': data,
                    status: 200
                });
            });

        })

    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//update 
exports.updatefeedback = async (req, res) => {
    const schema = Joi.object({
        parentid: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
        tuition: Joi.string().required(),
        teacherid: Joi.string().required(),
        rating: Joi.string().required(),
        comment: Joi.string().required(),
        isActive: Joi.boolean().required()
    })

    await schema.validateAsync(req.body);

    const id = req.params.id;
    let payload = req.body;

    try {
        const pInfo = await Feedback.findById(id);

        if (!pInfo) {
            res.status(404);
            throw new Error('Feedback not found')
        }
        else {
            const data = await Feedback.findByIdAndUpdate(req.params.id, payload, { new: true })
            return res.status(200).json({ 'message': 'feedback updated successfully', 'data': data });
        }


    } catch (err) {
        console.log(err, 'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete feedback
exports.deletefeedback = async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) throw err
            return res.status(200).json({ 'message': 'parent deleted successfully', 'deletedparent': data })
        })

    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

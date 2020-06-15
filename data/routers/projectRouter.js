const express = require('express');
const project = require('../helpers/projectModel');
const router = express.Router();

function validateProjectId(req,res,next){
    project.get(req.params.id)
    .then(projectid=>{
        if(projectid){
            req.project = projectid
            next()
        }else{
            res.status(400).json({message:'invalid id'})
        }
    })
}

//get
router.get('/',(req,res)=>{
    project.get()
    .then(p=>{
        res.status(200).json(p)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:cannot get'
        })
    })
})

//add
router.post('/',(req,res)=>{
    const addedproject = req.body
project.insert(addedproject)
.then(ap=>{
    res.status(201).json(ap)
})
.catch(error=>{
    console.log(error);
    res.status(500).json({
        error:'error:cannto add'
    })
})

})

//get by action
router.get(':/id/actions',validateProjectId,(req,res)=>{
    project.getProjectActions(req.params.id)
    .then(projectactions=>{
        res.status(200).json(projectactions)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:cannot get'
        })
    })
})

//get by id
router.get(':/id/',validateProjectId,(req,res)=>{
    project.get(req.params.id)
    .then(projectid=>{
        res.status(200).json(projectid)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:cannot get'
        })
    })
})


//update
router.put('/:id',validateProjectId,(req,res)=>{
    const id=req.params.id

    if(!req.body.name || req.body.description){
        res.status(400).json({
            error:'include name and description'

        })
    }
    project.update(id,req.body)
    .then(updated=>{
        res.status(200).json(updated)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:cannot update'
        })
    })
})

//delete

router.delete('/id',(req,res)=>{
    project.remove(req.params.id)
    .then(dele=>{
        res.status(204).json(dele)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:cannot delete'
        })
    })
})

module.exports = router




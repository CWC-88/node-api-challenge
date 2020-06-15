const express = require('express');
const router = express.Router()
const actions = require('.../helpers/actionModel');


//get all
router.get('/',(req,res)=>{
    actions.get()
    .then(akshun=>{
        res.status(200).json(akshun)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:action not available'
        })
    })
})

//add
router.post('/',(req,res)=>{
    actions.insert(req,res)
    .then(add=>{
        res.status(201).json(add)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error:'error:cannot add'
        })
    })
})

//update
router.put('/:id',(req,res)=>{
    const id = req.params.id;
   if(!req.body.notes || !req.body.description){
res.status(400).json({
    error:'include notes and description'
})
   }
actions.update(id, req.body)
.then(update=>{
    res.status(200).json(update);

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
    actions.remove(req.params.id)
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
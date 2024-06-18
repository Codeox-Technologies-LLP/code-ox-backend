const FaqModel = require('../Model/faq')

/// get
const getFaq = async (req,res) => {
    try{
        const data = await FaqModel.find({})
        res.status(200).json({ statusCode: 200, message: 'odoo Faq successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//post 
const addFaq = async (req, res) => {
    try{
        const data = {
            question: req.body.question,
            answer: req.body.answer,
           
        }; 
        const newfAq =  new FaqModel(data);
        const savedFaq = await newfAq.save();

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Faqs added succesfully",
            data: savedFaq
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: err.message

        })
    } 
};

//update
const updateFaq = async (req, res) => {
    try {
      const id = req.params.id;
      let data = {};
  
      // Update data even if value is the same (avoids empty $set)
      if (req.body.question) data['question'] = req.body.question;
      if (req.body.answer) data['answer'] = req.body.answer;
  
      const response = await FaqModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
  
      if (!response) {
        return res.status(404).json({ statusCode: 404, success: false, message: 'Faqs not found' });
      }
  
      res.status(200).json({ statusCode: 200, success: true, message: 'Faqs updated successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
  };
  

//delete

const deleteFaq = async (req, res) => {
    try{
        const id = req.params.id;
        const response =await FaqModel.findOneAndDelete({ _id: id });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Faqs not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Faqs deleted succesfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { getFaq,deleteFaq,updateFaq, addFaq }
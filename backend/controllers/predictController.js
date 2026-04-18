const Prediction = require("../models/Prediction");
const axios = require("axios");

exports.predictPrice = async (req, res) => {
  try {
    const { area, bedrooms, bathrooms, age, location } = req.body;

    // Call Flask API
    const flaskUrl = process.env.FLASK_API_URL || "http://127.0.0.1:5001/predict";
    const flaskRes = await axios.post(flaskUrl, {
      area, bedrooms, bathrooms, age
    });

    if (!flaskRes.data.success) {
      return res.status(500).json({ message: "Error from ML Model" });
    }

    const predictedPrice = flaskRes.data.prediction;

    // Save to MongoDB if user is logged in (optional but we assume they are)
    let predictionRecord = null;
    if (req.user) {
      predictionRecord = new Prediction({
        userId: req.user.id,
        area,
        bedrooms,
        bathrooms,
        age,
        location,
        predictedPrice
      });
      await predictionRecord.save();
    }

    res.json({
      success: true,
      prediction: predictedPrice,
      formated_prediction: flaskRes.data.formated_prediction,
      record: predictionRecord
    });
  } catch (err) {
    console.error(err.message);
    // Provide a mocked response if ML model isn't running (for UI testing purposes)
    const mockedPrice = 10000 + (req.body.area * 4000);
    res.json({
      success: true,
      prediction: mockedPrice,
      formated_prediction: `${(mockedPrice/100000).toFixed(2)} Lakhs`,
      note: "ML Model offline. Showing mock result."
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(predictions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


import React, { useState } from 'react';
import './c.css'
import Navbar from './Navbar';


const Diet = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [overallGoal, setOverallGoal] = useState('maintenance');
  const [calculatedData, setCalculatedData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const calculate = () => {
    console.log('Calculating...');
    console.log('Height:', height);
    console.log('Weight:', weight);
    console.log('Age:', age);
    console.log('Goal Weight:', goalWeight);
    console.log('Gender:', gender);
    console.log('Activity Level:', activityLevel);
    console.log('Overall Goal:', overallGoal);

    // Calculate BMR
    let bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
    bmr = Math.trunc(bmr);

    // Calculate deficit, maintenance, and bulking calories
    let deficitCalories = bmr - 500;
    let maintenanceCalories = bmr;
    let bulkingCalories = bmr + 500;

    // Adjust calories based on overall goal
    let calories;
    if (overallGoal === 'cutting') {
      calories = deficitCalories;
    } else if (overallGoal === 'bulking') {
      calories = bulkingCalories;
    } else {
      calories = maintenanceCalories;
    }

    // Assuming 1g of protein and carbohydrates = 4 calories, and 1g of fats = 9 calories
    const protein = Math.round((0.25 * calories) / 4);
    const fats = Math.round((0.25 * calories) / 9);
    const carbohydrates = Math.round((0.5 * calories) / 4);

    console.log('Calculated data:', { calories, protein, fats, carbohydrates });

    // Store calculated data in state
    setCalculatedData({ calories, protein, fats, carbohydrates });
    setSubmitted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate();
  };

  return (
    
    <div>
      <Navbar></Navbar>
      <form className="calories-form">
  <h2 className="form-title-i">Calories Calculator</h2>
  <label className="form-label">
    Height (cm):
    <input className="form-input" type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
  </label>
  <label className="form-label">
    Weight (kg):
    <input className="form-input" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
  </label>
  <label className="form-label">
    Age:
    <input className="form-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
  </label>
  <label className="form-label">
    Goal Weight (kg):
    <input className="form-input" type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} required />
  </label>
  <label className="form-label">
    Gender:
    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </label>
  <label className="form-label">
    Activity Level:
    <select className="form-select" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
      <option value="low">Low</option>
      <option value="moderate">Moderate</option>
      <option value="high">High</option>
    </select>
  </label><br />
  <label className="form-label">
    Overall Goal:
    <select className="form-select" value={overallGoal} onChange={(e) => setOverallGoal(e.target.value)}>
      <option value="cutting">Cutting</option>
      <option value="bulking">Bulking</option>
      <option value="maintenance">Maintenance</option>
    </select>
  </label><br />
  <button className="form-button" type="submit" onClick={handleSubmit}>Calculate</button>
</form>

      
      {calculatedData && (
        <div className="result ">
          <table>
            <tbody>
              <tr>
                <td>Calories:</td>
                <td>{calculatedData.calories}</td>
              </tr>
              <tr>
                <td>Protein (g):</td>
                <td>{calculatedData.protein}</td>
              </tr>
              <tr>
                <td>Fats (g):</td>
                <td>{calculatedData.fats}</td>
              </tr>
              <tr>
                <td>Carbohydrates (g):</td>
                <td>{calculatedData.carbohydrates}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Diet;

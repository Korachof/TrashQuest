// UI for user "cleanup" entries
// Form for users to log their cleanup activities
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  increment,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import FormGroup from '../shared/FormGroup';
import FormButton from '../shared/FormButton';
import TrashTypeSelect from './TrashTypeSelect';
import { formContainer } from '../../styles/forms';
import { useAuth } from '../../context/AuthContext';

// Points values for each size
const POINTS_VALUES = {
  'Single Small Item': 3,
  'Single Large Item': 10,
  'Grocery Bag (~4 gallons)': 60,
  'Standard Garbage Bag (~13 gallons)': 180,
  'Commercial Garbage Bag (~30 gallons)': 450,
};

// Cleanup types with educational info
const CLEANUP_TYPES = [
  { value: 'General Trash', label: 'General Trash' },
  { value: 'General Recycling', label: 'General Recycling' },
  { value: 'Electronics Recycling', label: 'Electronics Recycling' },
  {
    value: 'Hazardous Waste Disposal',
    label: 'Hazardous Waste Disposal ⚠️',
    warning: true,
  },
];

// Area options
const AREA_OPTIONS = ['Downtown', 'Residential', 'Park', 'Highway', 'Beach'];

export default function LogCleanupForm({
  // Set component parameters for updating logged entries
  editMode = false,
  existingEntry = null,
  onCancel = null,
  onUpdate = null,
}) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Today's date as default
    // If we're editing, pre-fill fields with existing data
    date: existingEntry?.date || new Date().toISOString().split('T')[0],
    size: existingEntry?.size || '',
    type: existingEntry?.type || '',
    area: existingEntry?.area || '',
    city: existingEntry?.city || '',
    state: existingEntry?.state || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculate points based on selected size
  const calculatePoints = () => {
    return POINTS_VALUES[formData.size] || 0;
  };

  // Check if form is valid (all required fields filled)
  const isFormValid = () => {
    return formData.date && formData.size && formData.type && formData.area;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      const pointsEarned = calculatePoints();
      // save cleanup entry to Firestore
      const cleanupEntry = {
        userId: currentUser.uid,
        date: formData.date,
        size: formData.size,
        type: formData.type,
        area: formData.area,
        city: formData.city || null,
        state: formData.state || null,
        pointsEarned: pointsEarned,
        createdAt: new Date(),
      };

      console.log('Cleanup entry to save:', cleanupEntry);

      if (editMode && existingEntry) {
        // Update existing entry
        await updateDoc(
          doc(db, 'cleanupEntries', existingEntry.id),
          cleanupEntry
        );
      } else {
        // Create new entry
        await addDoc(collection(db, 'cleanupEntries'), cleanupEntry);
      }

      // Update user's total points
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);

      let updatePoints;
      if (editMode && existingEntry) {
        // Calculate point difference for edit
        updatePoints = pointsEarned - existingEntry.pointsEarned;
      }

      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(userRef, {
          email: currentUser.email,
          displayName: currentUser.displayName,
          totalEcoPoints: pointsEarned,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // Update the existing user document
        await updateDoc(userRef, {
          totalEcoPoints: increment(updatePoints),
          updatedAt: new Date(),
        });
      }

      if (editMode) {
        alert('Entry updated successfully!');
        if (onCancel) onCancel(); // Close the modal
        if (onUpdate) onUpdate(); // refresh list
      } else {
        alert(
          `Cleanup logged successfully! You earned ${pointsEarned} Eco Points!`
        );
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging cleanup:', error);
      alert('Error logging cleanup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to initial state
    setFormData({
      date: new Date().toISOString().split('T')[0], // Reset to today's date
      size: '',
      type: '',
      area: '',
      city: '',
      state: '',
    });
    console.log('Cancel clicked');

    // Reset loading states just in case
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={formContainer}>
        {/* Date Field */}
        <FormGroup
          id="cleanup-date"
          label="Date*"
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          required
        />

        {/* Size Selection */}
        <FormGroup
          id="cleanup-size"
          label="Cleanup Size*"
          type="select"
          value={formData.size}
          onChange={(e) => handleInputChange('size', e.target.value)}
          required
        >
          <option value="">Select size...</option>
          {Object.keys(POINTS_VALUES).map((size) => (
            <option key={size} value={size}>
              {size} ({POINTS_VALUES[size]} points)
            </option>
          ))}
        </FormGroup>

        {/* Type Selection */}
        <TrashTypeSelect
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          required={true}
        />

        {/* Area Selection */}
        <FormGroup
          id="cleanup-area"
          label="General Area*"
          type="select"
          value={formData.area}
          onChange={(e) => handleInputChange('area', e.target.value)}
          required
        >
          <option value="">Select area...</option>
          {AREA_OPTIONS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </FormGroup>

        {/* City (Optional) */}
        <FormGroup
          id="cleanup-city"
          label="City (Optional)"
          type="text"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          required={false}
          placeholder="Enter city name"
        />

        {/* State (Optional) */}
        <FormGroup
          id="cleanup-state"
          label="State (Optional)"
          type="text"
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          required={false}
          placeholder="Enter state"
        />

        {/* Points Preview */}
        {formData.size && (
          <div
            style={{
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: 0, color: '#155724' }}>
              🎉 You'll earn {calculatePoints()} Eco Points!
            </h3>
          </div>
        )}

        {/* Form Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <FormButton
            isLoading={isLoading}
            loadingText="Logging Cleanup..."
            disabled={!isFormValid()}
            type="submit"
          >
            Log Cleanup
          </FormButton>

          <FormButton type="button" isCancel={true} onClick={handleCancel}>
            Cancel
          </FormButton>
        </div>
      </form>
    </>
  );
}

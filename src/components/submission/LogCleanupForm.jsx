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
import { usePoints } from '../../context/PointsContext';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../styles/colors';
import { pointsPreview, formButtonLayout } from '../../styles/layout';
import {
  cleanupPointsValues as ptsVal,
  logCleanupFormContent as content,
} from '../../content/logCleanup';
import HoneypotField from '../shared/HoneypotField';
import SuccessMessage from '../shared/SuccessMessage';

// Points values for each size
const POINTS_VALUES = {
  [content.smallItemTxt]: ptsVal.smallItem,
  [content.largeItemTxt]: ptsVal.largeItem,
  [content.groceryBagTxt]: ptsVal.groceryBag,
  [content.garbageBagtxt]: ptsVal.garbageBag,
  [content.commercialBagTxt]: ptsVal.commercialBag,
};

// Area options
const AREA_OPTIONS = [
  content.area1,
  content.area2,
  content.area3,
  content.area4,
  content.area5,
];

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
  const [honeypot, setHoneypot] = useState('');
  const { updateUserPoints } = usePoints();

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
      alert(content.fieldsUnfilledError);
      return;
    }

    // Check if the bot filled the hidden honey pot field
    if (honeypot) {
      // Bot detected - fake success and exit
      alert(
        `${content.cleanupSuccess} ${calculatePoints()} ${content.ecoPtsMsg}`
      );
      navigate('/dashboard');
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
        ...(editMode && existingEntry && { id: existingEntry.id }), // Add ID when editing
      };

      console.log(content.saveCleanup, cleanupEntry);

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

      let updatePoints = pointsEarned;
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
        alert(content.updateCleanup);
        if (onCancel) onCancel(); // Close the modal
        if (onUpdate) {
          onUpdate(cleanupEntry);
        }
      } else {
        alert(`${content.cleanupSuccess} ${pointsEarned} ${content.ecoPtsMsg}`);
        updateUserPoints(pointsEarned); // Update PointsContext
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(content.consoleErrMsg, error);
      alert(content.cleanupErrAlert);
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
    console.log(content.consoleCancel);

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
          <option value="">{content.sizeSelect}</option>
          {Object.keys(POINTS_VALUES).map((size) => (
            <option key={size} value={size}>
              {size} ({POINTS_VALUES[size]} {content.pts})
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
          <option value="">{content.areaSelect}</option>
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

        {/* Honeypot (hidden from users) */}
        <HoneypotField
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        {/* Points Preview */}
        {formData.size && (
          <div
            style={{
              background: pointsPreview.background,
              border: pointsPreview.border,
              padding: pointsPreview.padding,
              borderRadius: pointsPreview.borderRadius,
              marginBottom: pointsPreview.marginBottom,
              textAlign: pointsPreview.textAlign,
            }}
          >
            <h3 style={{ margin: 0, color: colors.EcoDisplayTextColor }}>
              {content.ptsEarnedMsg}
              {calculatePoints()}
              {content.ecoPts}
            </h3>
          </div>
        )}

        {/* Form Buttons */}
        <div style={formButtonLayout}>
          <FormButton
            isLoading={isLoading}
            loadingText="Logging Cleanup..."
            disabled={!isFormValid()}
            type="submit"
          >
            {content.logButton}
          </FormButton>

          <FormButton
            type="button"
            isCancel={true}
            onClick={editMode ? onCancel : handleCancel}
          >
            {content.cancelButton}
          </FormButton>
        </div>
      </form>
    </>
  );
}

# Dataset-Trained AI/ML Medical Triage System - Simple System Design

## 1. Overview

The Dataset-Trained AI/ML Medical Triage System helps emergency staff assess patient urgency using a machine learning model trained on triage data. Nurses enter a patient's symptoms and vital signs, and the system predicts the triage priority level.

**Benefits:**

- Speeds up initial patient assessment
- Improves consistency across staff
- Helps doctors focus on high-risk patients
- Reduces variability from workload or experience

## 2. Workflow

1. Nurse inputs patient symptoms and vital signs.
2. Frontend sends data to the backend.
3. Backend preprocesses data to match model format.
4. ML model predicts triage priority.
5. Result is displayed.
6. Patient is added to the doctor review queue by priority and arrival time.

## 3. Main Modules

### 3.1 Triage Input Screen

Allows nurses to enter:

- Symptoms
- Vital signs (temperature, oxygen saturation, heart rate, blood pressure)
- Other triage indicators

**Action:** Submit patient for evaluation.

### 3.2 Data Preprocessing Module

Prepares inputs for the model by:

- Handling missing values
- Encoding categorical data
- Normalizing features
- Ensuring model-compatible structure

### 3.3 ML Prediction Engine

- Receives processed data
- Runs the trained model
- Predicts triage priority
- Returns results to backend

### 3.4 Result / Priority Screen

Displays:

- Predicted priority (e.g., Critical, High, Moderate, Low)
- Short prediction summary
- Option to confirm and add to queue

### 3.5 Patient Queue

Shows patients in priority order, considering arrival time for equal priorities.

## 4. Prediction Logic

- Dataset-driven; no fixed rules
- Flow: capture -> preprocess -> predict -> store -> queue
- Output depends on trained dataset patterns

## 5. Technical Design

**Frontend:** Next.js

- Nurse forms
- Prediction result screen
- Queue board

**Backend:** Django

- Receives and preprocesses data
- Runs trained ML model
- Returns predictions
- Saves queue entries

**Database:** SQLite

- Stores patient info, predictions, timestamps, and queue records

**ML Model:** Python-based

- Decision Tree, Random Forest, Logistic Regression, or XGBoost
- Random Forest recommended for student prototype

**Architecture Flow:**
`Next.js UI -> Django API -> Data Preprocessing -> ML Model -> SQLite -> Queue Display`

## 6. UI Recommendations

### 6.1 New Triage Assessment

- Symptom input fields
- Vital sign inputs
- Submit button

### 6.2 Triage Result Screen

- Predicted priority clearly visible
- Short summary
- Add to queue button

### 6.3 Patient Priority Board

- Columns: Token/ID, Symptoms, Priority, Time Added, Status

### 6.4 Model Management

- Simple: load trained model directly in backend

## 7. Dataset & Database Notes

- Dataset trains and validates the model
- Examples: MIMIC-IV ED Dataset, MIETIC, or synthetic triage datasets
- SQLite stores only patient entries, predictions, timestamps, and queue
- Dataset must be cleaned, structured, and labeled for triage outcomes

## 8. Final Recommendation

- Prototype: Dataset-trained AI/ML triage system
- Frontend: Next.js
- Backend: Django
- Database: SQLite
- Dataset: Training, testing, validation, prediction
- Future: Improve model accuracy with richer clinical data

## 9. Conclusion

This system provides a practical, dataset-driven approach for triage prediction. It leverages ML to identify patient urgency based on symptoms and vital signs, rather than relying on static rules, making it ideal for prototypes and student projects.

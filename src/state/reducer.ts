import { Diagnosis } from './../types';
/* eslint-disable no-mixed-spaces-and-tabs */
import { State } from './state';
import { Patient } from '../types';

export type Action =
	| {
			type: 'SET_PATIENT_LIST';
			payload: Patient[];
	  }
	| {
			type: 'ADD_PATIENT';
			payload: Patient;
	  }
	| {
			type: 'SET_PATIENT_DETAILS';
			payload: Patient;
	  }
	| {
			type: 'SET_DIAGNOSES';
			payload: Diagnosis[];
	  }
	| {
			type: 'ADD_ENTRY';
			payload: Patient;
	  };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_PATIENT_LIST':
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{},
					),
					...state.patients,
				},
			};
		case 'ADD_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case 'SET_PATIENT_DETAILS':
			return {
				...state,
				patientDetails: {
					...state.patientDetails,
					[action.payload.id]: action.payload,
				},
			};
		case 'SET_DIAGNOSES':
			return {
				...state,
				diagnoses: {
					...action.payload.reduce(
						(memo, diagnose) => ({
							...memo,
							[diagnose.code]: diagnose,
						}),
						{},
					),
					...state.diagnoses,
				},
			};
		case 'ADD_ENTRY':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		default:
			return state;
	}
};

export const setPatientList = (patients: Patient[]): Action => {
	return {
		type: 'SET_PATIENT_LIST',
		payload: patients,
	};
};

export const addPatient = (patient: Patient): Action => {
	return {
		type: 'ADD_PATIENT',
		payload: patient,
	};
};

export const setPatientDetails = (patient: Patient): Action => {
	return {
		type: 'SET_PATIENT_DETAILS',
		payload: patient,
	};
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
	return {
		type: 'SET_DIAGNOSES',
		payload: diagnoses,
	};
};

export const addEntry = (patient: Patient): Action => {
	return {
		type: 'ADD_ENTRY',
		payload: patient,
	};
};

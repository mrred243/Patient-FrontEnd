import { Field, Formik } from 'formik';
import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import {
	DiagnosisSelection,
	NumberField,
	TextField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import {
	EntryType,
	HealthCheckEntry,
	HealthCheckRating,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from '../types';

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

export type EntryFormValues =
	| Omit<HospitalEntry, 'id'>
	| Omit<OccupationalHealthcareEntry, 'id'>
	| Omit<HealthCheckEntry, 'id'>;

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

	const initialValues: EntryFormValues = {
		description: '',
		specialist: '',
		diagnosisCodes: [],
		date: '',
		type: EntryType.HealthCheck,
		healthCheckRating: HealthCheckRating.LowRisk,
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const errors: { [field: string]: string } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				return errors;
			}}>
			{({ dirty, isValid, setFieldValue, setFieldTouched }) => {
				return (
					<Form className='form ui'>
						<Field
							label='Description'
							placeholder='Description'
							name='description'
							component={TextField}
						/>
						<Field
							label='Specialist'
							placeholder='Specialist'
							name='specialist'
							component={TextField}
						/>
						<Field
							label='Date'
							placeholder='YYYY-MM-DD'
							name='date'
							component={TextField}
						/>

						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>
						<Field
							label='healthCheckRating'
							name='healthCheckRating'
							component={NumberField}
							min={0}
							max={3}
						/>
						<Grid>
							<Grid.Column floated='left' width={5}>
								<Button
									type='button'
									onClick={onCancel}
									color='red'>
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated='right' width={5}>
								<Button
									type='submit'
									disabled={!dirty || !isValid}
									floated='right'
									color='green'>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;

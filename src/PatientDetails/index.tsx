import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientDetails, addEntry } from '../state';

import { Entry as TypeEntry, Patient } from '../types';

import Entry from './Entries';

const PatientDetails = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | undefined>();
	const [{ patientDetails }, dispatch] = useStateValue();

	const renderGender = (gender: string): JSX.Element => {
		switch (gender) {
			case 'male':
				return <Icon name='man' />;
			case 'female':
				return <Icon name='woman' />;
			case 'other':
				return <Icon name='neuter' />;
			default:
				return <></>;
		}
	};

	useEffect(() => {
		const fetchPatientById = async () => {
			try {
				const { data: patient } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`,
				);
				dispatch(setPatientDetails(patient));
				return patient;
			} catch (error) {
				console.log(error);
			}
		};
		if (id in patientDetails) {
			setPatient(
				Object.values(patientDetails).find(
					(patient: Patient) => patient.id === id,
				),
			);
		} else {
			void fetchPatientById().then((res) => setPatient(res));
		}
	}, [dispatch]);

	const submitNewEntry = async (values: EntryFormValues) => {
		console.log('click');
		try {
			const { data: updatedPatient } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values,
			);
			dispatch(addEntry(updatedPatient));
			closeModal();
		} catch (e) {
			console.error(e.response?.data || 'Unknown Error');
			setError(e.response?.data?.error || 'Unknown error');
		}
	};

	if (!patient) return null;
	return (
		<div>
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>
			<h2>
				{patient.name}
				{renderGender(patient.gender)}{' '}
				<Button onClick={() => openModal()}>Add New Entry</Button>
			</h2>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			{patient.entries.length > 0 ? (
				<div>
					<h3>Entries</h3>
					{patient.entries.map((entry: TypeEntry) => (
						<Entry key={entry.id} entry={entry} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default PatientDetails;

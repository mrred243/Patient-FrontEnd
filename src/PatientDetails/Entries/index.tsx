import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {
	Entry,
	EntryType,
	HealthCheckEntry,
	HealthCheckRating,
} from '../../types';

const Entries: React.FC<{ entry: Entry }> = ({ entry }) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`,
		);
	};

	switch (entry.type) {
		case EntryType.Hospital:
			return <HospitalityEntry entry={entry} />;
		case EntryType.OccupationalHealthcare:
			return <OccupationalHealthCareEntry entry={entry} />;
		case EntryType.HealthCheck:
			return <HealthCheckEntryComponent entry={entry} />;
		default:
			return assertNever(entry);
	}
};

export default Entries;

const HospitalityEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
	return (
		<Card>
			<Card.Header>
				{entry.date} <Icon name='hospital symbol' />
			</Card.Header>
			<Card.Content description={entry.description} />
		</Card>
	);
};

const OccupationalHealthCareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
	return (
		<Card>
			<Card.Header>
				{entry.date} <Icon name='user doctor' />
			</Card.Header>
			<Card.Content description={entry.description} />
		</Card>
	);
};

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({
	entry,
}) => {
	return (
		<Card>
			<Card.Header>
				{entry.date} <Icon name='user doctor' />
			</Card.Header>
			<Card.Content description={entry.description} />
			<HealthCheckRatingComponent rating={entry.healthCheckRating} />
		</Card>
	);
};

const HealthCheckRatingComponent = ({
	rating,
}: {
	rating: HealthCheckRating;
}) => {
	let color: 'green' | 'yellow' | 'orange' | 'red';

	switch (rating) {
		case 0:
			color = 'green';
			break;
		case 1:
			color = 'yellow';
			break;
		case 2:
			color = 'orange';
			break;
		case 3:
			color = 'red';
			break;
		default:
			color = 'green';
			break;
	}
	return (
		<Card.Content extra>
			<Icon name='heart' color={color} />
		</Card.Content>
	);
};

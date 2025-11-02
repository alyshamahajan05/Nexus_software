import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, Button, Divider, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchJobById, deleteJob } from '../api/jobs';

function JobDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [job, setJob] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchJobById(id);
				setJob(data);
			} catch (err) {
				toast.error(err?.detail || 'Failed to load job');
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [id]);

	const handleDelete = async () => {
		if (!window.confirm('Delete this job?')) return;
		try {
			await deleteJob(job._id || id);
			toast.success('Job deleted');
			navigate('/company/jobs');
		} catch (err) {
			toast.error('Failed to delete');
		}
	};

	if (loading) {
		return (
			<Box display="flex" alignItems="center" justifyContent="center" minHeight="50vh">
				<CircularProgress />
			</Box>
		);
	}

	if (!job) return null;

	return (
		<Box>
			<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{
						background: 'linear-gradient(135deg, #5B6CFF 0%, #7C4DFF 100%)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						fontWeight: 800,
						mb: 1
					}}
				>
					{job.title || 'Job Details'}
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
					Posted location: {job.location || 'N/A'}
				</Typography>
			</motion.div>

			<Paper sx={{ p: 3 }}>
				<Stack direction="row" spacing={1} mb={2}>
					<Chip label={job.status || 'active'} color={(job.status || 'active') === 'active' ? 'success' : 'default'} />
					{job.salary ? <Chip label={`Salary: ${job.salary}`} /> : null}
				</Stack>

				<Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Description</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>{job.description || '—'}</Typography>

				<Divider sx={{ my: 2 }} />

				<Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Key Requirements</Typography>
				<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
					{(job.skills_required || []).map((s, idx) => (
						<Chip key={idx} label={s} color="primary" variant="outlined" />
					))}
					{(!job.skills_required || job.skills_required.length === 0) && (
						<Typography variant="body2" color="text.secondary">No skills listed</Typography>
					)}
				</Stack>

				<Box display="flex" gap={2} mt={3}>
					<Button variant="outlined" component={Link} to="/company/jobs">Back to Jobs</Button>
					<Button variant="contained" color="error" onClick={handleDelete}>Delete Job</Button>
				</Box>
			</Paper>
		</Box>
	);
}

export default JobDetails;


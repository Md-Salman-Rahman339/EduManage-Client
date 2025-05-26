import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button, Modal, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextareaAutosize, Rating } from '@mui/material';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

const MyEnrollClassDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [cls, setCls] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submissionText, setSubmissionText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await axiosSecure.get(`/class/${id}`);
        setCls(classRes.data);

        const assignmentsRes = await axiosSecure.get(`/assignments?classId=${id}`);
        setAssignments(assignmentsRes.data);

        const submissionsRes = await axiosSecure.get(`/submissions?classId=${id}`);
        setSubmissions(submissionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  const handleSubmitAssignment = async (assignmentId) => {
    try {
      const newSubmission = {
        classId: id,
        assignmentId,
        studentEmail: user.email,
        submissionText,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };

      const res = await axiosSecure.post('/submissions', newSubmission);
      setSubmissions([...submissions, res.data]);
      
      // Increment submission count in the assignment
      const updatedAssignments = assignments.map(assignment => {
        if (assignment._id === assignmentId) {
          return {
            ...assignment,
            submissionCount: (assignment.submissionCount || 0) + 1
          };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      
      setSubmissionText('');
      alert('Assignment submitted successfully!');
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert('Failed to submit assignment');
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const feedbackData = {
        classId: id,
        studentEmail: user.email,
        feedback,
        rating,
        createdAt: new Date().toISOString()
      };

      await axiosSecure.post('/feedback', feedbackData);
      setOpenFeedbackModal(false);
      setFeedback('');
      setRating(0);
      alert('Thank you for your feedback!');
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert('Failed to submit feedback');
    }
  };

  if (!cls) return <div className="p-6">Loading class details...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Class Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{cls.title}</h2>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenFeedbackModal(true)}
          style={{ marginTop: '10px' }}
        >
          Teaching Evaluation Report (TER)
        </Button>
      </div>

      {/* Class Image & Description */}
      <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)} className="w-full">
        <Tilt className="rounded-2xl overflow-hidden shadow-md">
          <img src={cls.image} alt={cls.title} className="w-full h-64 object-cover" />
        </Tilt>
        <p className="text-gray-700 mt-4">{cls.description}</p>
      </motion.div>

      {/* Assignments Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Assignments</h3>
        {assignments.length === 0 ? (
          <p>No assignments yet</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Submission</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment._id}>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.description}</TableCell>
                    <TableCell>
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {submissions.some(s => s.assignmentId === assignment._id && s.studentEmail === user.email) ? (
                        <span className="text-green-600">Submitted</span>
                      ) : (
                        <div className="flex flex-col space-y-2">
                          <TextareaAutosize
                            minRows={3}
                            placeholder="Your submission..."
                            className="border p-2 rounded"
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSubmitAssignment(assignment._id)}
                            disabled={!submissionText}
                          >
                            Submit
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* Feedback Modal */}
      <Modal
        open={openFeedbackModal}
        onClose={() => setOpenFeedbackModal(false)}
        aria-labelledby="feedback-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" gutterBottom>
            Teaching Evaluation Report
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="feedback-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TextField
              label="Feedback"
              multiline
              rows={4}
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmitFeedback}
              disabled={!feedback || rating === 0}
              sx={{ mt: 2 }}
            >
              Send Feedback
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyEnrollClassDetails;
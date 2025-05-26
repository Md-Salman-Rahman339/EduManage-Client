import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button, Modal, TextField, Typography, Box } from '@mui/material';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

const MyClassDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [cls, setCls] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Form state
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDeadline, setAssignmentDeadline] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');

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
  }, [id]);

  const handleCreateAssignment = async () => {
    try {
      const newAssignment = {
        classId: id,
        title: assignmentTitle,
        deadline: assignmentDeadline,
        description: assignmentDescription,
        createdAt: new Date().toISOString(),
        createdBy: user.email,
      };

      const res = await axiosSecure.post('/assignments', newAssignment);
      setAssignments([...assignments, res.data]);
      setCls({ ...cls, assignments: (cls.assignments || 0) + 1 });

      // Reset form
      setAssignmentTitle('');
      setAssignmentDeadline('');
      setAssignmentDescription('');
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  if (!cls) return <div className="p-6">Loading class details...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Class Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{cls.title}</h2>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Create Assignment
        </Button>
      </div>

      {/* Class Image & Description */}
      <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)} className="w-full">
        <Tilt className="rounded-2xl overflow-hidden shadow-md">
          <img src={cls.image} alt={cls.title} className="w-full h-64 object-cover" />
        </Tilt>
        <p className="text-gray-700 mt-4">{cls.description}</p>
      </motion.div>

      {/* Class Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {[
          { label: "Total Enrollment", value: cls.enrolled || 0 },
         { label: "Total Assignments", value: assignments.length },

          { label: "Total Submissions", value: submissions.length },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
            <Tilt className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-3xl font-bold text-blue-600">{item.value}</h3>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Assignments List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Assignments</h3>
        {assignments.length === 0 ? (
          <p>No assignments yet</p>
        ) : (
          <div className="grid gap-4">
            {assignments.map((a, index) => (
              <motion.div
                key={a._id}
                variants={fadeIn("up", "spring", index * 0.2, 0.75)}
              >
                <Tilt className="p-4 rounded-xl bg-white shadow-md">
                  <h4 className="text-lg font-semibold">{a.title}</h4>
                  <p className="text-sm text-gray-600">
                    Deadline: {new Date(a.deadline).toLocaleString()}
                  </p>
                  <p className="mt-2 text-gray-700">{a.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Submissions: {submissions.filter(s => s.assignmentId === a._id).length}
                  </p>
                </Tilt>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating assignment */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="create-assignment-modal"
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
          <Typography variant="h6">Create New Assignment</Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              required
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Deadline"
              type="datetime-local"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={assignmentDeadline}
              onChange={(e) => setAssignmentDeadline(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              required
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleCreateAssignment}
              disabled={!assignmentTitle || !assignmentDeadline || !assignmentDescription}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyClassDetails;

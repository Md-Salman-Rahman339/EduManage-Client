// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { Button, Modal, TextField, Typography, Box, CircularProgress, Alert } from '@mui/material';
// import { Tilt } from 'react-tilt';
// import { motion } from 'framer-motion';
// import { fadeIn } from '../../utils/motion';
// import { format } from 'date-fns';

// const MyClassDetails = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { id } = useParams();

//   const [cls, setCls] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form state
//   const [assignmentTitle, setAssignmentTitle] = useState('');
//   const [assignmentDeadline, setAssignmentDeadline] = useState('');
//   const [assignmentDescription, setAssignmentDescription] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!id) return;
      
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Fetch class details
//         const classRes = await axiosSecure.get(`/api/classes/my-classes/details/${id}/`);
//         setCls(classRes.data);

//         // Fetch assignments
//         const assignmentsRes = await axiosSecure.get(`/api/assignments/?classId=${id}`);
//         setAssignments(assignmentsRes.data);

//         // Fetch submissions
//         const submissionsRes = await axiosSecure.get(`/api/submissions/?classId=${id}`);
//         setSubmissions(submissionsRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.response?.data?.message || error.message || 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, axiosSecure]);

//   const handleCreateAssignment = async () => {
//     try {
//       if (!assignmentTitle || !assignmentDeadline || !assignmentDescription) {
//         throw new Error('All fields are required');
//       }

//       const newAssignment = {
//         class_obj_id: id, 
//         title: assignmentTitle,
//         due_date: assignmentDeadline, 
//         description: assignmentDescription,
//         // createdBy: user.email,
//       };

//       const res = await axiosSecure.post('/api/assignments/create/', newAssignment);
//       setAssignments([...assignments, res.data]);
      
   
//       setCls(prev => ({ 
//         ...prev, 
//         assignments: (prev.assignments || 0) + 1 
//       }));


//       setAssignmentTitle('');
//       setAssignmentDeadline('');
//       setAssignmentDescription('');
//       setOpenModal(false);
//     } catch (error) {
//       console.error("Error creating assignment:", error);
//       setError(error.response?.data?.message || error.message || 'Failed to create assignment');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <Alert severity="error">{error}</Alert>
//       </div>
//     );
//   }

//   if (!cls) {
//     return (
//       <div className="p-6">
//         <Alert severity="warning">No class found with this ID</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Error Alert */}
//       {error && (
//         <motion.div variants={fadeIn("down", "spring", 0.1, 0.75)}>
//           <Alert severity="error" onClose={() => setError(null)}>
//             {error}
//           </Alert>
//         </motion.div>
//       )}

//       {/* Class Header */}
//       <div className="flex justify-between items-center mb-4">
//         <motion.div variants={fadeIn("left", "spring", 0.2, 0.75)}>
//           <h2 className="text-2xl font-bold">{cls.title}</h2>
//           <p className="text-gray-600">Instructor: {cls.teacher?.name || user?.name}</p>
//         </motion.div>
        
//         <motion.div variants={fadeIn("right", "spring", 0.2, 0.75)}>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={() => setOpenModal(true)}
//           >
//             Create Assignment
//           </Button>
//         </motion.div>
//       </div>

//       {/* Class Image & Description */}
//       <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)} className="w-full">
//         <Tilt className="rounded-2xl overflow-hidden shadow-md">
//           <img 
//             src={cls.image || '/default-class.jpg'} 
//             alt={cls.title} 
//             className="w-full h-64 object-cover" 
//             onError={(e) => {
//               e.target.src = '/default-class.jpg';
//             }}
//           />
//         </Tilt>
//         <div className="mt-4 space-y-2">
//           <p className="text-gray-700">{cls.description}</p>
         
//         </div>
//       </motion.div>

//       {/* Class Progress Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         {[
//           { label: "Total Enrollment", value: cls.enrolled || 0 },
//           { label: "Total Assignments", value: assignments.length },
//           { label: "Total Submissions", value: submissions.length },
//         ].map((item, index) => (
//           <motion.div key={index} variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
//             <Tilt className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow">
//               <h3 className="text-3xl font-bold text-blue-600">{item.value}</h3>
//               <p className="text-gray-600 mt-2">{item.label}</p>
//             </Tilt>
//           </motion.div>
//         ))}
//       </div>

//       {/* Assignments List */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">Assignments</h3>
        
//         {assignments.length === 0 ? (
//           <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)}>
//             <div className="p-4 bg-gray-50 rounded-lg text-center">
//               <p>No assignments yet</p>
//               <Button 
//                 variant="text" 
//                 color="primary"
//                 onClick={() => setOpenModal(true)}
//                 className="mt-2"
//               >
//                 Create your first assignment
//               </Button>
//             </div>
//           </motion.div>
//         ) : (
//           <div className="grid gap-4">
//             {assignments.map((assignment, index) => {
//               const assignmentSubmissions = submissions.filter(
//                 s => s.assignmentId === assignment.id
//               ).length;
              
//               return (
//                 <motion.div
//                   key={assignment.id}
//                   variants={fadeIn("up", "spring", index * 0.2, 0.75)}
//                 >
//                   <Tilt className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="text-lg font-semibold">{assignment.title}</h4>
//                         <p className="text-sm text-gray-600">
//                           Deadline: {assignment.deadline ? format(new Date(assignment.deadline), 'PPpp') : 'No deadline provided'}

//                         </p>
//                       </div>
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                         {assignmentSubmissions} submission{assignmentSubmissions !== 1 ? 's' : ''}
//                       </span>
//                     </div>
//                     <p className="mt-2 text-gray-700">{assignment.description}</p>
//                     <div className="mt-3 flex gap-2">
//                       <Button 
//                         variant="outlined" 
//                         size="small"
//                         component="a"
//                         href={`/dashboard/assignments/${assignment.id}`}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </Tilt>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Modal for creating assignment */}
//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="create-assignment-modal"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: { xs: '90%', sm: 500 },
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//           outline: 'none',
//         }}>
//           <Typography variant="h6" component="h2" gutterBottom>
//             Create New Assignment
//           </Typography>
          
//           <Box component="form" sx={{ mt: 2 }}>
//             <TextField
//               label="Title"
//               fullWidth
//               required
//               value={assignmentTitle}
//               onChange={(e) => setAssignmentTitle(e.target.value)}
//               sx={{ mb: 2 }}
//               margin="normal"
//             />
            
//             <TextField
//               label="Deadline"
//               type="datetime-local"
//               fullWidth
//               required
//               InputLabelProps={{ shrink: true }}
//               value={assignmentDeadline}
//               onChange={(e) => setAssignmentDeadline(e.target.value)}
//               sx={{ mb: 2 }}
//               margin="normal"
//               inputProps={{
//                 min: new Date().toISOString().slice(0, 16)
//               }}
//             />
            
//             <TextField
//               label="Description"
//               multiline
//               rows={4}
//               fullWidth
//               required
//               value={assignmentDescription}
//               onChange={(e) => setAssignmentDescription(e.target.value)}
//               sx={{ mb: 2 }}
//               margin="normal"
//             />
            
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//               <Button
//                 variant="outlined"
//                 onClick={() => setOpenModal(false)}
//               >
//                 Cancel
//               </Button>
              
//               <Button
//                 variant="contained"
//                 onClick={handleCreateAssignment}
//                 disabled={!assignmentTitle || !assignmentDeadline || !assignmentDescription}
//               >
//                 Create Assignment
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default MyClassDetails;
// MyClassDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button, Modal, TextField, Typography, Box, CircularProgress, Alert, Chip } from '@mui/material';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { format } from 'date-fns';

const MyClassDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [cls, setCls] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSubmissionModal, setOpenSubmissionModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDeadline, setAssignmentDeadline] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [submissionContent, setSubmissionContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch class details
        const classRes = await axiosSecure.get(`/api/classes/my-classes/details/${id}/`);
        setCls(classRes.data);

        // Fetch assignments
        const assignmentsRes = await axiosSecure.get(`/api/assignments/?classId=${id}`);
        setAssignments(assignmentsRes.data);

        // Fetch submissions
        // const submissionsRes = await axiosSecure.get(`/api/submissions/?assignment__class_obj_id=${id}`);
        const submissionsRes = await axiosSecure.get(`/api/submissions/?assignment__class_obj_id=${id}`);
        setSubmissions(submissionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  const handleCreateAssignment = async () => {
    try {
      if (!assignmentTitle || !assignmentDeadline || !assignmentDescription) {
        throw new Error('All fields are required');
      }

      const newAssignment = {
        class_obj_id: id, 
        title: assignmentTitle,
        due_date: assignmentDeadline, 
        description: assignmentDescription,
      };

      const res = await axiosSecure.post('/api/assignments/create/', newAssignment);
      setAssignments([...assignments, res.data]);
      
      setCls(prev => ({ 
        ...prev, 
        assignments: (prev.assignments || 0) + 1 
      }));

      setAssignmentTitle('');
      setAssignmentDeadline('');
      setAssignmentDescription('');
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
      setError(error.response?.data?.message || error.message || 'Failed to create assignment');
    }
  };

  const handleSubmitAssignment = async () => {
    try {
      if (!submissionContent) {
        throw new Error('Submission content is required');
      }

      const newSubmission = {
        assignment: selectedAssignment.id,
        content: submissionContent
      };

      const res = await axiosSecure.post('/api/submissions/create/', newSubmission);
      setSubmissions([...submissions, res.data]);
      
      setSubmissionContent('');
      setOpenSubmissionModal(false);
      setSelectedAssignment(null);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setError(error.response?.data?.message || error.message || 'Failed to submit assignment');
    }
  };

  const getSubmissionStatus = (assignmentId) => {
    const submission = submissions.find(s => s.assignment === assignmentId);
    if (!submission) return null;
    
    return {
      status: submission.grade !== null ? 'graded' : 'submitted',
      grade: submission.grade,
      feedback: submission.feedback
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (!cls) {
    return (
      <div className="p-6">
        <Alert severity="warning">No class found with this ID</Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Error Alert */}
      {error && (
        <motion.div variants={fadeIn("down", "spring", 0.1, 0.75)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </motion.div>
      )}

      {/* Class Header */}
      <div className="flex justify-between items-center mb-4">
        <motion.div variants={fadeIn("left", "spring", 0.2, 0.75)}>
          <h2 className="text-2xl font-bold">{cls.title}</h2>
          <p className="text-gray-600">Instructor: {cls.teacher?.name || user?.name}</p>
        </motion.div>
        
        {user.role === 'teacher' && (
          <motion.div variants={fadeIn("right", "spring", 0.2, 0.75)}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setOpenModal(true)}
            >
              Create Assignment
            </Button>
          </motion.div>
        )}
      </div>

      {/* Rest of your existing component... */}

      {/* Assignments List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Assignments</h3>
        
        {assignments.length === 0 ? (
          <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)}>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p>No assignments yet</p>
              {user.role === 'teacher' && (
                <Button 
                  variant="text" 
                  color="primary"
                  onClick={() => setOpenModal(true)}
                  className="mt-2"
                >
                  Create your first assignment
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {assignments.map((assignment, index) => {
              const submissionStatus = getSubmissionStatus(assignment.id);
              const isPastDue = new Date(assignment.deadline) < new Date();
              
              return (
                <motion.div
                  key={assignment.id}
                  variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                >
                  <Tilt className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">
                          Deadline: {assignment.deadline ? format(new Date(assignment.deadline), 'PPpp') : 'No deadline provided'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        {submissionStatus ? (
                          <Chip 
                            label={submissionStatus.grade ? `Graded: ${submissionStatus.grade}` : 'Submitted'} 
                            color={submissionStatus.grade ? 'success' : 'info'} 
                            size="small"
                          />
                        ) : isPastDue ? (
                          <Chip label="Past Due" color="error" size="small" />
                        ) : (
                          <Chip label="Not Submitted" color="warning" size="small" />
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{assignment.description}</p>
                    <div className="mt-3 flex gap-2">
                      <Button 
                        variant="outlined" 
                        size="small"
                        component="a"
                        href={`/dashboard/assignments/${assignment.id}`}
                      >
                        View Details
                      </Button>
                      
                      {user.role === 'student' && !submissionStatus && (
                        <Button 
                          variant="contained" 
                          size="small"
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setOpenSubmissionModal(true);
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                    
                    {submissionStatus?.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="font-medium">Instructor Feedback:</p>
                        <p>{submissionStatus.feedback}</p>
                      </div>
                    )}
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assignment Creation Modal (existing code remains the same) */}
//       {/* Modal for creating assignment */}
//       <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="create-assignment-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: 'none',
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create New Assignment
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              required
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              sx={{ mb: 2 }}
              margin="normal"
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
              margin="normal"
              inputProps={{
                min: new Date().toISOString().slice(0, 16)
              }}
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
              margin="normal"
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              
              <Button
                variant="contained"
                onClick={handleCreateAssignment}
                disabled={!assignmentTitle || !assignmentDeadline || !assignmentDescription}
              >
                Create Assignment
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {/* Submission Modal */}
      <Modal
        open={openSubmissionModal}
        onClose={() => {
          setOpenSubmissionModal(false);
          setSelectedAssignment(null);
        }}
        aria-labelledby="submit-assignment-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: 'none',
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Submit Assignment: {selectedAssignment?.title}
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Your Submission"
              multiline
              rows={6}
              fullWidth
              required
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              sx={{ mb: 2 }}
              margin="normal"
              placeholder="Write your assignment submission here. You can include text, links, or any other relevant content."
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenSubmissionModal(false);
                  setSelectedAssignment(null);
                }}
              >
                Cancel
              </Button>
              
              <Button
                variant="contained"
                onClick={handleSubmitAssignment}
                disabled={!submissionContent}
              >
                Submit Assignment
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyClassDetails;
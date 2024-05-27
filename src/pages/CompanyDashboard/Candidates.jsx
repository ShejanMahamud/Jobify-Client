import { DatePicker, Modal, TimePicker, Tooltip } from "antd";
import JoditEditor from "jodit-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  MdCancel,
  MdDoneAll,
  MdEvent,
  MdExitToApp,
  MdLocalOffer,
  MdPersonAdd,
  MdSend,
  MdVisibility,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import PDFViewer from "../../Utils/PDFViewer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCandidates from "../../hooks/useCandidates";
import useJoditConfigs from "../../hooks/useJoditConfigs";
import Parser from "./../../Utils/Parser";

const Candidates = () => {
  const {config,editor} = useJoditConfigs()
  const [otherInfo,setOtherInfo] = useState(null)
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);
  const [coverModal, setCoverLetter] = useState(false);
  const [resumeModal, setResumeModal] = useState(false);
  const [interviewModal,setInterviewModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useCandidates(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      </div>
    );
  }

  const handleCoverLetterModal = (candidate) => {
    setSelectedCandidate(candidate);
    setCoverLetter(true);
  };
  const handleResumeModal = (candidate) => {
    setSelectedCandidate(candidate);
    setResumeModal(true);
  };

  const handleInterviewScheduledModal = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewModal(true);
  }

  const handleChangeStatus = async (id, status) => {
    const { data } = await axiosSecure.patch(`/applied_job/${id}`, {
      status: status,
    });
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("Status Changed!");
    }
  };


  const handleInterviewScheduled = async (e, id) => {
    e.preventDefault();
    const interview_time = e.target.time.value;
    const interview_date = e.target.date.value;
    const interview_location = e.target.location?.value;
    const interview_link = e.target.meet?.value;
    const interview_query = otherInfo;
  
    let interview_info = {
      ...(interview_time && { interview_time }),
      ...(interview_date && { interview_date }),
      ...(interview_query && { interview_query }),
      status: 'scheduled'
    };
  
    if (selectedCandidate.job_nature === 'On Site' || selectedCandidate.job_nature === 'Hybrid') {
      interview_info = {
        ...interview_info,
        ...(interview_location && { interview_location })
      };
    } else if (selectedCandidate.job_nature === 'Remote') {
      interview_info = {
        ...interview_info,
        ...(interview_link && { interview_link })
      };
    }
  
    const { data } = await axiosSecure.patch(`/applied_job/${id}`, interview_info);
    if (data.modifiedCount > 0) {
      toast.success("Interview Added!");
    }
  };

  return (
    <div className="w-full px-5 py-5 font-inter border-l border-[#E4E5E8] min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[#18191C] font-medium text-xl">
          Candidates ({data && data.length})
        </h1>
      </div>
      <div className="overflow-auto w-full mt-10 min-h-screen">
        <table className="table w-full">
          <thead>
            <tr className="bg-[#F1F2F4] uppercase">
              <th>Candidate Name</th>
              <th>Applications</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((candidate) => {
                const isExpanded = expandedCandidateId === candidate._id;
                return (
                  <tr key={candidate._id} className="w-full">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={candidate?.photo} alt="applicant.png" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{candidate?.name}</div>
                          <div className="text-sm opacity-50">
                            {candidate?.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {candidate?.job_title}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {candidate?.company_name}
                      </span>
                    </td>
                    <td>
                      {candidate?.status === "applied" && (
                        <div className="flex items-center gap-1 text-blue-500">
                          <MdSend className="text-lg" />
                          <span>Applied</span>
                        </div>
                      )}
                      {candidate?.status === "in-review" && (
                        <div className="flex items-center gap-1 text-orange-500">
                          <MdVisibility className="text-lg" />
                          <span>In Review</span>
                        </div>
                      )}
                      {candidate?.status === "scheduled" && (
                        <div className="w-full flex items-center gap-1 text-cyan-500">
                          <MdEvent className="text-lg" />
                          <span className="w-full">Interview Scheduled</span>
                        </div>
                      )}
                      {candidate?.status === "interviewed" && (
                        <div className="flex items-center gap-1 text-green-500">
                          <MdDoneAll className="text-lg" />
                          <span>Interviewed</span>
                        </div>
                      )}
                      {candidate?.status === "offered" && (
                        <div className="flex items-center gap-1 text-[#daa520]">
                          <MdLocalOffer className="text-lg" />
                          <span>Offered</span>
                        </div>
                      )}
                      {candidate?.status === "hired" && (
                        <div className="flex items-center gap-1 text-[#008080]">
                          <MdPersonAdd className="text-lg" />
                          <span>Hired</span>
                        </div>
                      )}
                      {candidate?.status === "rejected" && (
                        <div className="flex items-center gap-1 text-red-500">
                          <MdCancel className="text-lg" />
                          <span>Rejected</span>
                        </div>
                      )}
                      {candidate?.status === "withdrawn" && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <MdExitToApp className="text-lg" />
                          <span>Withdrawn</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-3 w-full">
                        <Tooltip title="In Review">
                          <button
                            disabled={candidate?.status === "in-review"}
                            onClick={() =>
                              handleChangeStatus(candidate._id, "in-review")
                            }
                          >
                            <MdVisibility className="text-xl text-orange-500" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Interview Scheduled">
                          <button
                          disabled={candidate?.status === "scheduled"}
                            onClick={() =>
                              handleInterviewScheduledModal(candidate)
                            }
                          >
                            <MdEvent className="text-xl text-cyan-500" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Interviewed">
                          <button
                            disabled={candidate?.status === "interviewed"}
                            onClick={() =>
                              handleChangeStatus(candidate._id, "interviewed")
                            }
                          >
                            <MdDoneAll className="text-xl text-green-500" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Offered">
                          <button
                            disabled={candidate?.status === "offered"}
                            onClick={() =>
                              handleChangeStatus(candidate._id, "offered")
                            }
                          >
                            <MdLocalOffer className="text-xl text-[#daa520]" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Hired">
                          <button
                            disabled={candidate?.status === "hired"}
                            onClick={() =>
                              handleChangeStatus(candidate._id, "hired")
                            }
                          >
                            <MdPersonAdd className="text-xl text-[#008080]" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Rejected">
                          <button
                            disabled={candidate?.status === "rejected"}
                            onClick={() =>
                              handleChangeStatus(candidate._id, "rejected")
                            }
                          >
                            <MdCancel className="text-xl text-red-500" />
                          </button>
                        </Tooltip>

                        <button
                          onClick={() =>
                            setExpandedCandidateId(
                              isExpanded ? null : candidate._id
                            )
                          }
                          className="px-2 py-2 rounded-lg focus:bg-[#F1F2F4] bg-transparent relative"
                        >
                          <img
                            src="https://gist.github.com/ShejanMahamud/c1041c2cbbe1bc18af5c541ab9a43b57/raw/23c14fb6f112498a6dbba920efca9820c074ab52/threedot.svg"
                            alt=""
                          />
                          {isExpanded && (
                            <div className="bg-white shadow-xl border border-[#E9EAED] rounded-lg py-2 px-2 flex flex-col items-center gap-2 absolute right-0 min-w-[200px] z-50">
                              <button
                                onClick={() =>
                                  handleCoverLetterModal(candidate)
                                }
                                className="w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2"
                              >
                                <MdLocalOffer className="text-xl" />
                                <span>Cover Letter</span>
                              </button>
                              <button
                                onClick={() => handleResumeModal(candidate)}
                                className="w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2"
                              >
                                <MdVisibility className="text-xl" />
                                <span>Resume</span>
                              </button>
                              <button
                                onClick={() => handleResumeModal(candidate)}
                                className="w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2"
                              >
                                <MdVisibility className="text-xl" />
                                <span>View Details</span>
                              </button>
                            </div>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        width={600}
        footer={false}
        open={coverModal}
        onCancel={() => setCoverLetter(false)}
      >
        {selectedCandidate && <Parser text={selectedCandidate?.cover_letter} />}
      </Modal>
      <Modal
        width={600}
        footer={false}
        open={interviewModal}
        onCancel={() => setInterviewModal(false)}
      >
        {/* want to add task submission feature */}
        {selectedCandidate && <form onSubmit={(e)=>handleInterviewScheduled(e,selectedCandidate?._id)} className="my-5 w-full flex flex-col items-start gap-3">
          {
            selectedCandidate?.job_nature === 'On Site' && <div className='flex flex-col items-start gap-2 w-full mb-3'>
            <h1 className='text-sm text-[#18191C]'>Location</h1>
            <input type="text" className='px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='location' placeholder='Location'/>
            </div>
          }
          {
            selectedCandidate?.job_nature === 'Remote' && <div className='flex flex-col items-start gap-2 w-full mb-3'>
            <h1 className='text-sm text-[#18191C]'>Meeting Link</h1>
            <input type="text" className='px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='meet' placeholder='Meeting Link'/>
            </div>
          }
          {
            selectedCandidate?.job_nature === 'Hybrid' && <div className='flex flex-col items-start gap-2 w-full mb-3'>
            <h1 className='text-sm text-[#18191C]'>Location</h1>
            <input type="text" className='px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='location' placeholder='Location'/>
            </div>
          }
    <div className="flex flex-col items-start gap-2 w-full">
      <h1 className="text-sm text-[#18191C]">Interview Date</h1>
      <DatePicker
      required
        name="date"
        format="YYYY-MM-DD"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        placeholder="Interview Date"
      />
    </div>
    <div className="flex flex-col items-start gap-2 w-full">
      <h1 className="text-sm text-[#18191C]">Interview Time</h1>
      <TimePicker
      required
      name="time"
      format="h:mm a"
      use12Hours
      className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
      placeholder="Interview Time"
      // onChange={(time)=> setTime(moment(time).format('h:mm a'))}
    />
    </div>

    <div className='flex flex-col items-start gap-2 col-span-3 w-full'>
  <h1 className='text-sm text-[#18191C]'>Other Query</h1>
  <JoditEditor
                ref={editor}
                config={config}
                onChange={(newContent) => setOtherInfo(newContent)}
                
              />
  </div>

    <button className="bg-primary text-white px-4 py-2 rounded-md">Submit </button>
      
          </form>}
      </Modal>
      <Modal
        width={600}
        height={500}
        footer={false}
        open={resumeModal}
        onCancel={() => setResumeModal(false)}
      >
        {selectedCandidate && (
          <PDFViewer url={selectedCandidate?.resume}/>
        )}
      </Modal>
    </div>
  );
};

export default Candidates;

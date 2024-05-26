import { useQuery } from "@tanstack/react-query";
import { Modal, message } from "antd";
import React, { useState } from "react";
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
import Parser from './../../Utils/Parser';
const Candidates = () => {
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);
  const [coverModal, setCoverLetter] = useState(false);
  const [resumeModal, setResumeModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["candidates", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/candidates?id=${id}`);
      return data;
    },
  });

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

  const items = [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      danger: true,
      disabled: true,
    },
  ];
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
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
                      <div className="flex items-center gap-1 w-full">
                      <button>
                        <MdVisibility className="text-lg" />
                        </button>
                      <button>
                        <MdEvent className="text-lg" />
                        </button>
                      <button>
                        <MdDoneAll className="text-lg" />
                        </button>
                        <button
                          onClick={() =>
                            setExpandedCandidateId(
                              isExpanded ? null : candidate._id
                            )
                          }
                          className="px-5 py-3 rounded-lg focus:bg-[#F1F2F4] bg-transparent relative"
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
                              <button  onClick={() =>
                                  handleResumeModal(candidate)
                                } className="w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2">
                                <MdVisibility className="text-xl" />
                                <span>Resume</span>
                              </button>
                              <button  onClick={() =>
                                  handleResumeModal(candidate)
                                } className="w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2">
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
        {selectedCandidate && (
          <Parser text={selectedCandidate?.cover_letter}/>
        )}
      </Modal>
      <Modal
        width={600}
        footer={false}
        open={resumeModal}
        onCancel={() => setResumeModal(false)}
      >
        {selectedCandidate && (
          <PDFViewer pdfUrl={selectedCandidate?.resume}/>
)}
      </Modal>
    </div>
  );
};

export default Candidates;

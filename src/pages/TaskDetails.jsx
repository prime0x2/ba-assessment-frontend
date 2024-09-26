import React from "react";
import dayjs from "dayjs";
import { Button, Tag } from "antd";
import { LuArrowLeft } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import useToast from "@/hooks/useToast";
import { CONSTANT } from "@/utility/constant";
import { getTaskById } from "@/redux/tasks/slice";

const TaskDetails = () => {
  const { id } = useParams();

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const task = useSelector((state) => state.tasksSlice.task);

  React.useEffect(() => {
    dispatch(getTaskById(id))
      .unwrap()
      .catch((error) => {
        console.log("🚀 prime0x2 | TaskDetails.js | getTaskById | error -->\n", error);
        toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
      });
  }, [dispatch, id, toast]);

  return (
    <div>
      <h1 className='text-2xl font-semibold'>
        {location.key !== "default" && (
          <Button size='large' icon={<LuArrowLeft />} onClick={() => navigate(-1)} className='mr-4 sm:mr-5'>
            Back
          </Button>
        )}
        {task?.title}
      </h1>

      <p className='mt-4 text-lg'>
        <strong>Priority: </strong>

        <Tag
          color={task?.priority === "high" ? "red" : task?.priority === "medium" ? "orange" : "green"}
          className='ml-1 inline-block px-4'
        >
          {task?.priority.toUpperCase()}
        </Tag>
      </p>

      <p className='mt-4 text-lg'>
        <strong>Status: </strong>

        <Tag
          color={task?.status === "completed" ? "blue" : task?.status === "in-progress" ? "purple" : "cyan"}
          className='ml-1 inline-block px-4'
        >
          {task?.status.toUpperCase()}
        </Tag>
      </p>

      <p className='mt-5 text-lg'>
        <strong>Due Date:</strong> {dayjs(task?.dueDate).format("DD MMM, YYYY")}
      </p>

      <p className='mt-4 text-lg'>
        <strong>Created At:</strong> {dayjs(task?.createdAt).format("DD MMM, YYYY | hh:mm A")}
      </p>

      <p className='mt-4 text-lg'>
        <strong>Description:</strong> {task?.description || "N/A"}
      </p>
    </div>
  );
};

export default TaskDetails;

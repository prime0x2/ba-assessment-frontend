import React from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { LuArrowLeft } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, DatePicker, Select } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import useToast from "@/hooks/useToast";
import { CONSTANT } from "@/utility/constant";
import { getTaskById, updateTask } from "@/redux/tasks/slice";

const TaskDetails = () => {
  const { id } = useParams();

  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const task = useSelector((state) => state.tasksSlice.task);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      dueDate: null,
      priority: "",
      status: "",
    },
  });

  React.useEffect(() => {
    const token = Cookies.get("ba-token");

    dispatch(getTaskById({ token, id }))
      .unwrap()
      .then((response) => {
        console.log("🚀 prime0x2 | TaskDetails.js | getTaskById | response -->\n", response);

        reset({
          title: response.title,
          description: response.description,
          dueDate: response.dueDate,
          priority: response.priority,
          status: response.status,
        });
      })
      .catch((error) => {
        console.log("🚀 prime0x2 | TaskDetails.js | getTaskById | error -->\n", error);
      });

    return () => {
      reset();
    };
  }, [dispatch, id, reset]);

  const onSubmit = (data) => {
    console.log("🚀 prime0x2 | TaskDetails.js | onSubmit | data -->\n", data);

    const token = Cookies.get("ba-token");

    dispatch(updateTask({ token, id, bodyData: data }))
      .unwrap()
      .then((response) => {
        console.log("🚀 prime0x2 | TaskDetails.js | updateTask | response -->\n", response);

        toast.success("Task updated successfully");
      })
      .catch((error) => {
        console.log("🚀 prime0x2 | TaskDetails.js | updateTask | error -->\n", error);

        toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
      });
  };

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

      <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='mt-5 px-0 sm:px-1'>
        <div className='grid gap-x-4 gap-y-2 sm:gap-x-10 sm:gap-y-5'>
          <Form.Item
            label={<span className='text-sm font-medium'>Title</span>}
            validateStatus={errors.title ? "error" : ""}
            help={
              errors.title && (
                <p className='mt-2 text-xs font-medium tracking-wide text-red-500'>{errors.title.message}</p>
              )
            }
            className='col-span-2 mb-0 mt-2 w-full sm:col-span-1'
          >
            <Controller
              name='title'
              control={control}
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => <Input {...field} placeholder='Enter a title' className='h-10 w-full' />}
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-sm font-medium'>Due Date</span>}
            validateStatus={errors.dueDate ? "error" : ""}
            help={
              errors.dueDate && (
                <p className='mt-2 text-xs font-medium tracking-wide text-red-500'>{errors.dueDate.message}</p>
              )
            }
            className='col-span-2 mb-0 mt-2 w-full sm:col-span-1'
          >
            <Controller
              name='dueDate'
              control={control}
              rules={{
                required: "Due date is required",
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : undefined}
                  placeholder='Select a due date'
                  className='h-10 w-full'
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-sm font-medium'>Priority</span>}
            validateStatus={errors.priority ? "error" : ""}
            help={
              errors.priority && (
                <p className='mt-2 text-xs font-medium tracking-wide text-red-500'>{errors.priority.message}</p>
              )
            }
            className='col-span-2 mb-0 mt-2 w-full sm:col-span-1'
          >
            <Controller
              name='priority'
              control={control}
              rules={{
                required: "Priority is required",
              }}
              render={({ field }) => (
                <Select {...field} placeholder='Select a priority' className='h-10 w-full'>
                  <Select.Option value='low'>Low</Select.Option>
                  <Select.Option value='medium'>Medium</Select.Option>
                  <Select.Option value='high'>High</Select.Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-sm font-medium'>Status</span>}
            validateStatus={errors.status ? "error" : ""}
            help={
              errors.status && (
                <p className='mt-2 text-xs font-medium tracking-wide text-red-500'>{errors.status.message}</p>
              )
            }
            className='col-span-2 mb-0 mt-2 w-full sm:col-span-1'
          >
            <Controller
              name='status'
              control={control}
              rules={{
                required: "Status is required",
              }}
              render={({ field }) => (
                <Select {...field} placeholder='Select a status' className='h-10 w-full'>
                  <Select.Option value='pending'>Pending</Select.Option>
                  <Select.Option value='in-progress'>In Progress</Select.Option>
                  <Select.Option value='completed'>Completed</Select.Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-sm font-medium'>Description</span>}
            className='col-span-2 mb-0 mt-2 w-full'
          >
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={6}
                  placeholder='Enter a description'
                  size='large'
                  className='text-sm'
                />
              )}
            />
          </Form.Item>

          <Form.Item className='col-span-2 mb-0 mt-2 flex w-full justify-end'>
            <Button type='primary' htmlType='submit' size='large' className='w-full px-5 sm:w-auto'>
              Update Task
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default TaskDetails;

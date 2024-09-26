import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Select, Switch, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  setSortBy,
  setSortOrder,
  setShowStatusFilter,
  setShowDueDateFilter,
  setShowPriorityFilter,
} from "@/redux/user/slice";
import useToast from "@/hooks/useToast";

const Settings = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const { sortBy, sortOrder, showStatusFilter, showDueDateFilter, showPriorityFilter } = useSelector(
    (state) => state.userSlice.preferences
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      sortBy,
      sortOrder,
      showStatusFilter,
      showDueDateFilter,
      showPriorityFilter,
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 prime0x2 | Settings.js | onSubmit | data -->\n", data);

    dispatch(setSortBy(data.sortBy));
    dispatch(setSortOrder(data.sortOrder));
    dispatch(setShowStatusFilter(data.showStatusFilter));
    dispatch(setShowDueDateFilter(data.showDueDateFilter));
    dispatch(setShowPriorityFilter(data.showPriorityFilter));

    toast.success("Settings updated successfully");
  };

  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
      <div className='w-full sm:max-w-sm'>
        <Form.Item label={<p className='text-base font-medium'>Sort By (Default)</p>}>
          <Controller
            name='sortBy'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                className='h-10'
                options={[
                  { label: "Due Date", value: "dueDate" },
                  { label: "Priority", value: "priority" },
                  { label: "Status", value: "status" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item label={<p className='text-base font-medium'>Show Order (Default)</p>}>
          <Controller
            name='sortOrder'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                className='h-10'
                options={[
                  { label: "Ascending", value: "asc" },
                  { label: "Descending", value: "desc" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name='showDueDateFilter'
            control={control}
            render={({ field }) => (
              <label className='flex items-center'>
                <Switch
                  checked={field.value}
                  onChange={(value) => field.onChange(value)}
                  className='mr-2'
                  checkedChildren='On'
                  unCheckedChildren='Off'
                />

                <span className='-mb-0.5 text-base font-medium'>Show Due Date Filter</span>
              </label>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name='showPriorityFilter'
            control={control}
            render={({ field }) => (
              <label className='flex items-center'>
                <Switch
                  checked={field.value}
                  onChange={(value) => field.onChange(value)}
                  className='mr-2'
                  checkedChildren='On'
                  unCheckedChildren='Off'
                />

                <span className='-mb-0.5 text-base font-medium'>Show Priority Filter</span>
              </label>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name='showStatusFilter'
            control={control}
            render={({ field }) => (
              <label className='flex items-center'>
                <Switch
                  checked={field.value}
                  onChange={(value) => field.onChange(value)}
                  className='mr-2'
                  checkedChildren='On'
                  unCheckedChildren='Off'
                />

                <span className='-mb-0.5 text-base font-medium'>Show Status Filter</span>
              </label>
            )}
          />
        </Form.Item>

        <Button type='primary' htmlType='submit' className='h-10 w-full'>
          Save Settings
        </Button>
      </div>
    </Form>
  );
};

export default Settings;

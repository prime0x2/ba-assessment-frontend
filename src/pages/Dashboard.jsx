import React from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Avatar, Button, Input, Popconfirm, Select, Space, Table, Tooltip, Tag, DatePicker } from "antd";

import useToast from "@/hooks/useToast";
import { CONSTANT } from "@/utility/constant";
import { getAllTasks, deleteTask } from "@/redux/tasks/slice";

const Dashboard = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, loading } = useSelector((state) => state.tasksSlice);
  const { sortBy, sortOrder, showStatusFilter, showDueDateFilter, showPriorityFilter } = useSelector(
    (state) => state.userSlice.preferences
  );

  const [filterDate, setFilterDate] = React.useState("");
  const [filterPriority, setFilterPriority] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchOption, setSearchOption] = React.useState("title");
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const numSelected = selectedRowKeys.length;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  React.useEffect(() => {
    dispatch(getAllTasks())
      .unwrap()
      .then((response) => {
        console.log("🚀 prime0x2 | Dashboard.js | getAllTasks | response -->\n", response);
      })
      .catch((error) => {
        console.error("🚀 prime0x2 | Dashboard.js | getAllTasks | error -->\n", error);
        toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
      });
  }, [dispatch, toast]);

  // Filter tasks based on search query and option
  const filteredTasks = React.useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearchQuery = searchQuery
          ? task[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        const matchesFilterDate = filterDate ? dayjs(task.dueDate).isSame(dayjs(filterDate), "day") : true;
        const matchesFilterPriority = filterPriority ? task.priority === filterPriority : true;
        const matchesFilterStatus = filterStatus ? task.status === filterStatus : true;

        return matchesSearchQuery && matchesFilterDate && matchesFilterPriority && matchesFilterStatus;
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          return sortOrder === "asc"
            ? dayjs(a.dueDate).isBefore(dayjs(b.dueDate))
              ? -1
              : 1
            : dayjs(b.dueDate).isBefore(dayjs(a.dueDate))
              ? -1
              : 1;
        } else if (sortBy === "priority") {
          const priorityOrder = ["low", "medium", "high"];
          return sortOrder === "asc"
            ? priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
            : priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
        } else if (sortBy === "status") {
          const statusOrder = ["pending", "in-progress", "completed"];
          return sortOrder === "asc"
            ? statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
            : statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
        }
      });
  }, [tasks, searchQuery, searchOption, filterDate, filterPriority, filterStatus, sortBy, sortOrder]);

  // Table Columns Configuration
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "w-72",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      className: "w-80",
      render: (description) => description || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      className: "w-48",
      render: (createdAt) => dayjs(createdAt).format("DD MMM, YYYY | HH:mm A"),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      align: "center",
      className: "w-40",
      render: (dueDate) => dayjs(dueDate).format("DD MMM, YYYY"),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      className: "w-48",
      render: (priority) => {
        const color = priority === "high" ? "red" : priority === "medium" ? "orange" : "green";

        return (
          <div className='mx-auto flex w-24 items-center justify-center'>
            <Tag color={color} className='m-0 w-full text-center'>
              {priority.toUpperCase()}
            </Tag>
          </div>
        );
      },
      filters: showPriorityFilter
        ? [
            { text: "High", value: "high" },
            { text: "Medium", value: "medium" },
            { text: "Low", value: "low" },
          ]
        : null,
      onFilter: (value, record) => record.priority === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      className: "w-48",
      render: (status) => {
        const color = status === "completed" ? "blue" : status === "in-progress" ? "purple" : "cyan";

        return (
          <div className='mx-auto flex w-24 items-center justify-center'>
            <Tag color={color} className='m-0 w-full text-center'>
              {status.toUpperCase()}
            </Tag>
          </div>
        );
      },
      filters: showStatusFilter
        ? [
            { text: "Completed", value: "completed" },
            { text: "In Progress", value: "in-progress" },
            { text: "Pending", value: "pending" },
          ]
        : null,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      className: "w-40",
      align: "center",
      render: (_, record) => (
        <Space size='middle'>
          <Tooltip title='Edit Task'>
            <Button
              icon={<AiOutlineEdit />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/dashboard/task/update/${record._id}`);
              }}
            />
          </Tooltip>

          <Tooltip title='Delete Task'>
            <Popconfirm
              title='Delete this task?'
              placement='topLeft'
              onConfirm={(e) => {
                e.stopPropagation();
                handleDeleteTask(record._id);
              }}
              okButtonProps={{ danger: true }}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<AiOutlineDelete />} onClick={(e) => e.stopPropagation()} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Handle Delete Task Action
  const handleDeleteTask = (id) => {
    let ids = [];

    if (id) {
      ids.push(id);
    } else {
      ids = selectedRowKeys;
    }

    dispatch(deleteTask({ ids }))
      .unwrap()
      .then(() => {
        toast.success("Task deleted successfully", 5);
      })
      .catch((error) => {
        toast.error(error.message || CONSTANT.DEFAULT_ERROR_TEXT, 5);
      });
  };

  return (
    <div>
      <div className='mb-5 flex w-full flex-col items-center justify-between gap-y-4 sm:flex-row'>
        <Space size='middle'>
          <Input
            size='large'
            placeholder='Search...'
            suffix={<AiOutlineSearch size={20} />}
            addonBefore={
              <Select className='w-24' value={searchOption} onChange={(value) => setSearchOption(value)}>
                <Select.Option value='title'>Title</Select.Option>
                <Select.Option value='priority'>Priority</Select.Option>
                <Select.Option value='status'>Status</Select.Option>
              </Select>
            }
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {showDueDateFilter && (
            <Tooltip title='Filter by Due Date'>
              <DatePicker
                value={filterDate}
                onChange={(date) => setFilterDate(date)}
                format='DD MMM, YYYY'
                placeholder='Filter by Due Date'
                className='h-10 w-44 text-sm'
              />
            </Tooltip>
          )}

          {showPriorityFilter && (
            <Select
              allowClear
              value={filterPriority || undefined}
              onChange={(value) => setFilterPriority(value || "")}
              placeholder='Filter by Priority'
              className='h-10 w-44'
            >
              <Select.Option value='high'>High</Select.Option>
              <Select.Option value='medium'>Medium</Select.Option>
              <Select.Option value='low'>Low</Select.Option>
            </Select>
          )}

          {showStatusFilter && (
            <Select
              allowClear
              value={filterStatus || undefined}
              onChange={(value) => setFilterStatus(value || "")}
              placeholder='Filter by Status'
              className='h-10 w-44'
            >
              <Select.Option value='completed'>Completed</Select.Option>
              <Select.Option value='in-progress'>In Progress</Select.Option>
              <Select.Option value='pending'>Pending</Select.Option>
            </Select>
          )}

          {searchQuery || filterDate || filterPriority || filterStatus ? (
            <Button
              size='large'
              className='h-10 text-sm'
              onClick={() => {
                setSearchQuery("");
                setFilterDate("");
                setFilterPriority("");
                setFilterStatus("");
              }}
            >
              Clear Filters
            </Button>
          ) : null}
        </Space>

        <Space size='middle' className='flex w-full flex-row-reverse justify-between sm:ml-2 sm:w-auto sm:flex-row'>
          <h3 className='text-lg sm:ml-2'>
            {filteredTasks.length < 1 && loading
              ? "Loading..."
              : numSelected > 0
                ? `${numSelected} tasks selected`
                : searchQuery
                  ? `${filteredTasks.length} results found`
                  : `Total Tasks: ${filteredTasks.length}`}
          </h3>

          {numSelected > 0 ? (
            <Tooltip title='Delete Selected'>
              <Popconfirm
                title='Delete selected tasks?'
                okText='Yes'
                cancelText='No'
                onConfirm={() => handleDeleteTask()}
                okButtonProps={{ danger: true }}
                placement='bottomRight'
              >
                <Button
                  className='flex items-center justify-center'
                  icon={<AiOutlineDelete size={20} />}
                  size='large'
                  danger
                  disabled={loading}
                />
              </Popconfirm>
            </Tooltip>
          ) : (
            <Tooltip title='Add New Task' placement='left'>
              <Button
                className='flex items-center justify-center'
                icon={<AiOutlinePlus size={20} />}
                size='large'
                onClick={() => navigate("/dashboard/task")}
              />
            </Tooltip>
          )}
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey={(row) => row._id}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        loading={loading}
        pagination={{
          pageSize: 10,
          total: filteredTasks.length,
          showSizeChanger: true,
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/dashboard/task/details/${record._id}`),
          className: "cursor-pointer",
        })}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default Dashboard;

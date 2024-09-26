import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { LuClipboardList, LuSettings, LuLogOut } from "react-icons/lu";

import useAuth from "@/hooks/useAuth";

const items = [
  {
    title: "Dashboard",
    key: "/dashboard",
    label: (
      <Link to='/dashboard'>
        <p className='-mb-0.5 ml-2'>Dashboard</p>
      </Link>
    ),
    icon: <LuClipboardList size={20} />,
    style: { height: "50px" },
  },
  {
    title: "Settings",
    key: "/dashboard/settings",
    label: (
      <Link to='/dashboard/settings'>
        <p className='-mb-0.5 ml-2'>Settings</p>
      </Link>
    ),
    icon: <LuSettings size={20} />,
    style: { height: "50px" },
  },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const routeTitle =
    items.find((item) => item.key === pathname)?.title || (pathname === "/dashboard/task" ? "Task" : "Task Details");

  const [collapsed, setCollapsed] = React.useState({
    collapsed: false,
    breakpoint: false,
  });

  const avatarMenu = [
    {
      key: "logout",
      label: <p className='py-0.5 text-sm font-normal'>Logout</p>,
      onClick: () => logout(),
    },
  ];

  return (
    <Layout className='min-h-screen'>
      <Layout.Sider
        width={240}
        style={{
          background: "#fff",
          height: "100vh",
        }}
        breakpoint='lg'
        collapsedWidth='0'
        className='adminSidebar left-0 top-0 z-10 border-r px-4'
        onCollapse={(collapsed, type) => {
          setCollapsed((prev) => ({
            ...prev,
            collapsed,
          }));
        }}
        onBreakpoint={(broken) => {
          const sider = document.querySelector(".adminSidebar");

          if (broken) {
            sider.style.position = "fixed";
            setCollapsed((prev) => ({
              ...prev,
              breakpoint: true,
            }));
          } else {
            sider.style.position = "sticky";
            setCollapsed((prev) => ({
              ...prev,
              breakpoint: false,
            }));
          }
        }}
      >
        <div className='py-4'>
          <h1 className='flex h-12 items-center justify-center rounded-md bg-slate-100'>
            <span className='text-primary font-iceberg text-xl font-extrabold uppercase'>Tasky</span>
          </h1>
        </div>

        <Menu
          mode='inline'
          items={items}
          selectedKeys={[items.find((item) => item.key === pathname)?.key]}
          className='!border-none'
        />
      </Layout.Sider>

      <Layout className='relative'>
        {!collapsed.collapsed && collapsed.breakpoint && (
          <div className='absolute left-0 top-0 z-[9] h-full w-full bg-black/30 backdrop-blur-sm' />
        )}

        <Layout.Header className='flex items-center bg-white p-0 pl-4 pr-6'>
          <div className='flex-grow'>
            <h1 className='text-xl font-bold'>{routeTitle}</h1>
          </div>

          <div className='flex-shrink-0'>
            <Dropdown menu={{ items: avatarMenu }} placement='bottomRight' trigger={["click"]} arrow>
              <Avatar className='flex cursor-pointer items-center justify-center bg-green-400'>
                <AiOutlineUser size={20} />
              </Avatar>
            </Dropdown>
          </div>
        </Layout.Header>

        <Layout.Content className='m-4 min-h-[200px] rounded-md bg-white p-4'>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;

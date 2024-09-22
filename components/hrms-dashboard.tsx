'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, HomeIcon, UsersIcon, CalendarIcon, CreditCardIcon, SettingsIcon, BellIcon, UserIcon, PlaneIcon, BriefcaseIcon, FileTextIcon, SearchIcon } from 'lucide-react'
import EmployeeDirectory from './employee/EmployeeDirectory'
import EmployeeOnboarding from './employee/EmployeeOnboarding'
import EmployeeOffboarding from './employee/EmployeeOffboarding'
import LeaveApply from './leave/LeaveApply'
import LeaveApprovalStatus from './leave/LeaveApprovalStatus'
import LeaveTrack from './leave/LeaveTrack'

const MenuItem = ({ label, isActive }: { label: string; isActive: boolean }) => (
  <div className={`menu-item ${isActive ? 'menu-item-active' : ''}`}>
    {label}
  </div>
);

const menuItems = [
  { icon: HomeIcon, label: 'Dashboard', link: 'dashboard' },
  {
    icon: UsersIcon,
    label: 'Employee',
    subItems: ['Directory', 'Onboarding', 'Offboarding'],
  },
  {
    icon: CalendarIcon,
    label: 'Leave Management',
    subItems: ['Apply Leave', 'Leave Tracker', 'Approval'],
  },
  {
    icon: CreditCardIcon,
    label: 'Payroll',
    subItems: ['Salary', 'Payslips', 'Tax'],
  },
  {
    icon: PlaneIcon,
    label: 'Travel',
    subItems: ['Travel Request', 'Travel Expense', 'Travel Policy'],
  },
  { icon: BriefcaseIcon, label: 'Self Service', link: 'self-service' },
  { icon: UsersIcon, label: 'Organization', link: 'organization' },
  { icon: FileTextIcon, label: 'Reports', link: 'reports' },
  { icon: SettingsIcon, label: 'Settings', link: 'settings' },
]

const DashboardPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Leave Tracker</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Annual Leave</span>
            <span className="font-medium">15/20 days</span>
          </div>
          <div className="flex justify-between">
            <span>Sick Leave</span>
            <span className="font-medium">3/10 days</span>
          </div>
          <div className="flex justify-between">
            <span>Personal Leave</span>
            <span className="font-medium">2/5 days</span>
          </div>
        </div>
      </div>
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Payroll Manager</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Next Payday</span>
            <span className="font-medium">15th May 2023</span>
          </div>
          <div className="flex justify-between">
            <span>Last Payslip</span>
            <span className="font-medium">30th April 2023</span>
          </div>
          <div className="flex justify-between">
            <span>YTD Earnings</span>
            <span className="font-medium">$24,500</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const EmployeeSubPage = ({ subPage }: { subPage: string }) => {
  let content;

  switch (subPage) {
    case 'Directory':
      content = <EmployeeDirectory />;
      break;
    case 'Onboarding':
      content = <EmployeeOnboarding />;
      break;
    case 'Offboarding':
      content = <EmployeeOffboarding />;
      break;
    default:
      content = <div>Select a subpage</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{subPage} Page</h2>
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
        {content}
      </div>
    </div>
  )
}

const EmployeePage = ({ subPage }: { subPage: string }) => (
  <EmployeeSubPage subPage={subPage} />
)

const LeaveManagementSubPage = ({ subPage }: { subPage: string }) => {
  let content;

  switch (subPage) {
    case 'Apply Leave':
      content = <LeaveApply />;
      break;
    case 'Approval':
      content = <LeaveApprovalStatus />;
      break;
    case 'Leave Tracker':
      content = <LeaveTrack />;
      break;
    default:
      content = <div>Select a subpage</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Leave Management - {subPage}</h2>
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
        {content}
      </div>
    </div>
  )
}

const LeaveManagementPage = ({ subPage }: { subPage: string }) => (
  <LeaveManagementSubPage subPage={subPage} />
)


const PayrollPage = ({ subPage }: { subPage: string }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Payroll - {subPage}</h2>
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
      <p className="text-muted-foreground">This is the {subPage} page for Payroll management. Add your specific content here.</p>
    </div>
  </div>
)

const TravelPage = ({ subPage }: { subPage: string }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Travel - {subPage}</h2>
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
      <p className="text-muted-foreground">This is the {subPage} page for Travel management. Add your specific content here.</p>
    </div>
  </div>
)

const SelfServicePage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Self Service</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Profile', 'Team', 'Calendar', 'Files', 'Delegation', 'Exit Details', 'Travel Expense', 'Travel Request'].map((item) => (
        <div key={item} className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{item}</h3>
          <p className="text-muted-foreground">View and manage your {item.toLowerCase()}.</p>
        </div>
      ))}
    </div>
  </div>
)

const OrganizationPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Organization</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Employee Data', 'Departments', 'Designations', 'Organization Tree', 'Birthday Folks', 'New Hires'].map((item) => (
        <div key={item} className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{item}</h3>
          <p className="text-muted-foreground">View {item.toLowerCase()} information.</p>
        </div>
      ))}
    </div>
  </div>
)

const SettingsPage = () => {
  const [activeSettingPage, setActiveSettingPage] = useState<string | null>(null)

  const settingsCategories = [
    {
      title: 'General',
      items: ['Company details', 'Domains', 'Rebranding', 'From Addresses']
    },
    {
      title: 'Organization',
      items: ['Users', 'Employee Profiles', 'Departments', 'Designations', 'Locations', 'Groups', 'Delegation']
    },
    {
      title: 'User Access Control',
      items: ['Roles', 'Permissions', 'Allowed IPs', 'Geo Restriction']
    },
    {
      title: 'Customization',
      items: ['Services', 'Forms', 'Dashboard Widgets', 'Custom Action', 'Templates']
    },
    {
      title: 'Automation',
      items: ['Workflows', 'Actions', 'Approvals', 'Scheduler', 'Blueprint']
    },
    {
      title: 'Marketplace',
      items: ['Astranova Labs', 'Others']
    },
    {
      title: 'Data Administration',
      items: ['Import History', 'Export History', 'Activity Log', 'Files Usage', 'API Usage']
    },
    {
      title: 'Developer Space',
      items: ['Web forms', 'Astranova Labs People API', 'Connections']
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Setup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsCategories.map((category) => (
          <div key={category.title} className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item}>
                  <button
                    className="w-full text-left p-2 hover:bg-primary-foreground hover:bg-opacity-10 rounded"
                    onClick={() => setActiveSettingPage(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {activeSettingPage && (
        <div className="mt-6 bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{activeSettingPage}</h3>
          <p className="text-muted-foreground">This is the settings page for {activeSettingPage}. Add your specific settings content here.</p>
        </div>
      )}
    </div>
  )
}

const ReportsPage = () => {
  const [activeReportPage, setActiveReportPage] = useState<string | null>(null)

  const reportCategories = [
    {
      title: 'Employee Information',
      icon: UsersIcon,
      items: ['Dashboard', 'Headcount', 'Employee addition trend', 'Employee attrition trend', 'Distribution', 'Diversity', 'Experience wise exit']
    },
    {
      title: 'Leave Tracker',
      icon: CalendarIcon,
      items: ['Daily leave status', 'Resource availability', 'Employee leave balance', 'Leave booked and balance', 'Leave type wise summary', 'Leave encashment details', 'Loss of pay details', 'Leave data for payroll']
    },
    {
      title: 'Files',
      icon: FileTextIcon,
      items: ['Acknowledgement receipts']
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports</h2>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">My Reports</button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Team Reports</button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Organization Reports</button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Analytics</button>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Reports"
          className="w-full p-2 pl-10 border rounded"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => (
          <div key={category.title} className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <category.icon className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item}>
                  <button
                    className="w-full text-left p-2 hover:bg-primary-foreground hover:bg-opacity-10 rounded flex items-center"
                    onClick={() => setActiveReportPage(item)}
                  >
                    <span className="mr-2">★</span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {activeReportPage && (
        <div className="mt-6 bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{activeReportPage}</h3>
          <p className="text-muted-foreground">This is the report page for {activeReportPage}. Add your specific report content here.</p>
        </div>
      )}
    </div>
  )
}

export default function HrmsDashboard() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activePage, setActivePage] = useState<string>('dashboard')
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null)

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />
      case 'employee':
        return <EmployeePage subPage={activeSubPage || 'Directory'} />
      case 'leave-management':
        return <LeaveManagementPage subPage={activeSubPage || 'Apply Leave'} />
      case 'payroll':
        return <PayrollPage subPage={activeSubPage || 'Salary'} />
      case 'travel':
        return <TravelPage subPage={activeSubPage || 'Travel Request'} />
      case 'self-service':
        return <SelfServicePage />
      case 'organization':
        return <OrganizationPage />
      case 'reports':
        return <ReportsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground p-4">
        <div className="text-2xl font-bold mb-8">Astra HRMS </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <div
                  className="flex items-center justify-between p-2 hover:bg-primary-foreground hover:bg-opacity-10 rounded cursor-pointer"
                  onClick={() => {
                    toggleSubmenu(item.label)
                    if (item.link) {
                      setActivePage(item.link)
                      setActiveSubPage(null)
                    }
                  }}
                >
                  <MenuItem label={item.label} isActive={activeMenu === item.label} />
                  {item.subItems && (
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
                <AnimatePresence>
                  {item.subItems && activeMenu === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 mt-2 space-y-1"
                    >
                      {item.subItems.map((subItem) => (
                        <motion.li
                          key={subItem}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <a
                            href="#"
                            className="block p-2 hover:bg-primary-foreground hover:bg-opacity-10 rounded"
                            onClick={() => {
                              setActivePage(item.label.toLowerCase().replace(' ', '-'))
                              setActiveSubPage(subItem)
                            }}
                          >
                            {subItem}
                          </a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-secondary text-secondary-foreground rounded-full shadow-md hover:bg-secondary/90 transition-colors">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="p-2 bg-secondary text-secondary-foreground rounded-full shadow-md hover:bg-secondary/90 transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {renderPage()}
      </main>
    </div>
  )
}
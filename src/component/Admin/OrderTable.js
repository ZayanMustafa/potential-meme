import { useState, useRef, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCode, FiTruck, FiCalendar, FiCopy } from 'react-icons/fi';
import { ClipboardIcon } from './ClipBoardIcon';

export const OrderTable = ({ orders }) => {
  const [isResizing, setIsResizing] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const tableRef = useRef(null);

  // Column width configuration
  const columnWidths = {
    name: '1fr',
    email: '1.5fr',  
    phone: '1fr',
    vin: '1.5fr',    
    model: '1fr',
    year: '0.8fr'    
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const tableRect = tableRef.current.getBoundingClientRect();
    const newWidth = e.clientX - tableRect.left;
  };

  const handleMouseUp = () => {
    setIsResizing(null);
    document.body.style.cursor = '';
  };

  const copyFullRow = (order) => {
    const rowText = [
      `name: ${order.name}`,
      `email: ${order.email}`,
      `phone: ${order.phone}`,
      `vin: ${order.vin}`,
      `model: ${order.model}`,
      `year: ${order.year}`
    ].join(', ');
    
    navigator.clipboard.writeText(rowText);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div 
      className="overflow-hidden rounded-xl shadow-lg backdrop-blur-sm bg-white/20"
      ref={tableRef}
    >
      {/* Header Row */}
      <div 
        className="grid gap-3 p-4 bg-indigo-600 text-white font-medium"
        style={{
          gridTemplateColumns: Object.values(columnWidths).join(' ')
        }}
      >
        {[
          { name: 'name', icon: <FiUser />, label: 'Name' },
          { name: 'email', icon: <FiMail />, label: 'Email' },
          { name: 'phone', icon: <FiPhone />, label: 'Phone' },
          { name: 'vin', icon: <FiCode />, label: 'VIN' },
          { name: 'model', icon: <FiTruck />, label: 'Model' },
          { name: 'year', icon: <FiCalendar />, label: 'Year' }
        ].map((column) => (
          <div 
            key={column.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {column.icon} {column.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Data Rows */}
      {orders.map((order) => (
        <div 
          key={order._id} 
          className="grid gap-3 p-4 border-b border-gray-200/30 hover:bg-white/10 transition-colors group relative"
          style={{
            gridTemplateColumns: Object.values(columnWidths).join(' ')
          }}
          onMouseEnter={() => setHoveredRow(order._id)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          {/* Full row copy button - appears on hover */}
          {hoveredRow === order._id && (
            <button
              onClick={() => copyFullRow(order)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
              title="Copy entire row"
            >
              <ClipboardIcon />
            </button>
          )}
          
          {/* Name Column */}
          <div className="truncate flex items-center justify-between">
            <span>{order.name}</span>
           
          </div>
          
          {/* Email Column */}
          <div className="truncate flex items-center justify-between">
            <a href={`mailto:${order.email}`} className="text-indigo-500 hover:underline">
              {order.email}
            </a>
           
          </div>
          
          {/* Phone Column */}
          <div className="truncate flex items-center justify-between">
            <a href={`tel:${order.phone}`} className="text-indigo-500 hover:underline">
              {order.phone}
            </a>
           
          </div>
          
          {/* VIN Column */}
          <div className="truncate font-mono flex items-center justify-between">
            <span>{order.vin}</span>
            
          </div>
          
          {/* Model Column */}
          <div className="truncate flex items-center justify-between">
            <span>{order.model}</span>
            
          </div>
          
          {/* Year Column */}
          <div className="flex items-center justify-between">
            <span>{order.year}</span>
            
          </div>
        </div>
      ))}
    </div>
  );
};
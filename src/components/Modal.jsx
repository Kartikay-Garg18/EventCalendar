export default function Modal({ children, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="transform transition-all duration-300 scale-100 opacity-100"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

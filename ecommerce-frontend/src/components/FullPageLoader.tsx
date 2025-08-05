/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
};

export default FullPageLoader;

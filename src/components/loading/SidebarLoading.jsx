import SidebarLoadindCard from "./SidebarLoadindCard";

const SidebarLoading = () => {
  return (
    <div className="w-full flex flex-col gap-6 mb-4 p-4 rounded-lg border border-slate-800/40">
      <SidebarLoadindCard />
      <SidebarLoadindCard />
      <SidebarLoadindCard />
    </div>
  );
};

export default SidebarLoading;

interface Props {
  isOpen?: boolean
  onClose?: () => void
}

export const SideMenu = ({ isOpen = true, onClose }: Props) => {
  return (
    <div
      data-testid="side-menu"
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 space-y-4 transition-transform z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:w-64 md:block`}
    >
      <div className="text-xl font-semibold">Menu</div>
      <div>メニュー項目1</div>
      <div>メニュー項目2</div>
      <div>メニュー項目3</div>

      {/* SP時のみ表示する閉じるボタン */}
      <button
        data-testid="menu-close"
        className="block md:hidden mt-4 text-sm text-blue-600 underline bg-white/20 border border-white rounded-md p-2 backdrop-blur shadow"
        onClick={onClose}
      >
        閉じる
      </button>
    </div>
  )
}

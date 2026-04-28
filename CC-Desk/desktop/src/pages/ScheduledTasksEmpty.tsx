import { useTranslation } from '../i18n'
import { mockStatusBar } from '../mocks/data'

export function ScheduledTasksEmpty() {
  const t = useTranslation()
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] flex min-h-screen font-[Inter,sans-serif]">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#F1F5F9] flex flex-col p-4 gap-2 text-sm font-medium z-40">
        <div className="flex items-center gap-3 px-2 mb-6 mt-12">
          <div className="w-8 h-8 rounded bg-[#CBD5E1] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#64748B]">filter_list</span>
          </div>
          <div>
            <div className="text-[#0F172A] font-bold">{t('sidebar.allProjects')}</div>
            <div className="text-[10px] text-[#64748B] uppercase tracking-widest">{t('scheduledPage.activeSession')}</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="px-3 py-2 text-[#64748B] hover:bg-[#E2E8F0] transition-all rounded-lg cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">add</span>
            <span>{t('sidebar.newSession')}</span>
          </div>
          {/* Active State: Scheduled */}
          <div className="px-3 py-2 bg-[#F8FAFC] text-[#0F172A] rounded-lg relative before:content-[''] before:absolute before:left-[-8px] before:w-1 before:h-4 before:bg-[#2563EB] before:rounded-full cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">calendar_today</span>
            <span>{t('sidebar.scheduled')}</span>
          </div>
          <div className="px-3 py-2 text-[#64748B] hover:bg-[#E2E8F0] transition-all rounded-lg cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">history</span>
            <span>{t('sidebar.timeGroup.today')}</span>
          </div>
          <div className="px-3 py-2 text-[#64748B] hover:bg-[#E2E8F0] transition-all rounded-lg cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">event_note</span>
            <span>{t('sidebar.timeGroup.last7days')}</span>
          </div>
          <div className="px-3 py-2 text-[#64748B] hover:bg-[#E2E8F0] transition-all rounded-lg cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">archive</span>
            <span>{t('sidebar.timeGroup.older')}</span>
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-[#64748B]/10">
          <div className="text-[10px] text-[#64748B] uppercase tracking-widest px-3 mb-2">{t('scheduledPage.executionMode')}</div>
          <div className="px-3 py-2 text-[#64748B] hover:bg-[#E2E8F0] transition-all rounded-lg cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">computer</span>
            <span>{t('scheduledPage.localMode')}</span>
          </div>
          <div className="px-3 py-2 text-[#64748B] hover:bg-[#E2E8F0] transition-all rounded-lg cursor-pointer duration-200 ease-in-out flex items-center gap-3">
            <span className="material-symbols-outlined">cloud</span>
            <span>{t('scheduledPage.remoteMode')}</span>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 ml-[280px] flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 left-[280px] z-30 bg-[#F8FAFC] flex justify-between items-center px-6 h-12 w-full border-b border-[#F1F5F9]">
          <div className="flex items-center gap-6 h-full">
            <div className="text-sm font-bold text-[#0F172A] uppercase tracking-tighter font-[Manrope,sans-serif]">Claude Code Companion</div>
            <nav className="flex items-center gap-4 h-full font-[Manrope,sans-serif] font-semibold tracking-wide text-sm">
              <span className="text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer active:opacity-70 h-full flex items-center">{t('titlebar.code')}</span>
              <span className="text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer active:opacity-70 h-full flex items-center">{t('titlebar.terminal')}</span>
              <span className="text-[#0F172A] border-b-2 border-[#2563EB] pb-1 h-full flex items-center pt-1">{t('titlebar.history')}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#64748B] text-sm cursor-pointer">arrow_back_ios</span>
              <span className="material-symbols-outlined text-[#64748B] text-sm cursor-pointer">arrow_forward_ios</span>
            </div>
            <div className="h-4 w-[1px] bg-[#64748B]/20"></div>
            <div className="text-[#64748B] hover:text-[#2563EB] transition-colors cursor-pointer text-xs font-semibold uppercase tracking-wider">{t('sidebar.settings')}</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 mt-12 mb-8 flex flex-col items-center justify-center p-8 bg-[#F8FAFC]">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-3xl font-[Manrope,sans-serif] font-extrabold text-[#0F172A] tracking-tight mb-16">{t('scheduledPage.title')}</h1>

            {/* Empty State Illustration/Card */}
            <div className="relative group">
              {/* Architectural Background Detail */}
              <div className="absolute -inset-4 bg-[#F1F5F9] rounded-[32px] -z-10 transition-all"></div>
              <div className="flex flex-col items-center py-20 px-8">
                <div className="w-32 h-32 rounded-full bg-[#CBD5E1] flex items-center justify-center mb-10 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-[#94A3B8]/10">
                    <span
                      className="material-symbols-outlined text-[#2563EB] text-5xl"
                      style={{ fontVariationSettings: "'wght' 300" }}
                    >
                      schedule
                    </span>
                  </div>
                </div>
                <p className="text-[#334155] font-[Inter,sans-serif] text-lg max-w-sm mx-auto leading-relaxed mb-12">
                  {t('tasks.emptyTitle')} {t('tasks.emptyDesc')}
                </p>
                <button className="group relative px-8 py-4 bg-[#2563EB] text-white rounded-xl font-[Manrope,sans-serif] font-bold text-sm tracking-wide shadow-lg hover:shadow-[#2563EB]/20 transition-all flex items-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30"></div>
                  <span className="material-symbols-outlined text-lg">add_task</span>
                  <span>{t('tasks.newTask')}</span>
                </button>
              </div>
            </div>

            {/* Subtle Decorative Bento Elements */}
            <div className="grid grid-cols-3 gap-4 mt-20 opacity-40">
              <div className="h-24 bg-[#F1F5F9] rounded-xl border border-[#94A3B8]/10 flex flex-col items-center justify-center p-4">
                <span className="material-symbols-outlined text-[#64748B] mb-2">commit</span>
                <div className="w-12 h-1 bg-[#94A3B8]/30 rounded-full"></div>
              </div>
              <div className="h-24 bg-[#F1F5F9] rounded-xl border border-[#94A3B8]/10 flex flex-col items-center justify-center p-4">
                <span className="material-symbols-outlined text-[#64748B] mb-2">terminal</span>
                <div className="w-8 h-1 bg-[#94A3B8]/30 rounded-full"></div>
              </div>
              <div className="h-24 bg-[#F1F5F9] rounded-xl border border-[#94A3B8]/10 flex flex-col items-center justify-center p-4">
                <span className="material-symbols-outlined text-[#64748B] mb-2">code_blocks</span>
                <div className="w-10 h-1 bg-[#94A3B8]/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full h-8 bg-[#F8FAFC] flex items-center justify-between px-4 z-50 border-t border-[#64748B]/20 font-[Inter,sans-serif] text-xs tracking-tight">
          <div className="flex items-center gap-3 text-[#64748B]">
            <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
            <span>{mockStatusBar.user} &bull; {mockStatusBar.username} &bull; {mockStatusBar.plan}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#64748B] hover:bg-[#F1F5F9] px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">account_tree</span>
              {mockStatusBar.branch}
            </span>
            <span className="text-[#64748B] hover:bg-[#F1F5F9] px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">workspaces</span>
              {mockStatusBar.worktreeToggle}
            </span>
            <span className="text-[#2563EB] font-bold hover:bg-[#F1F5F9] px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">toggle_on</span>
              {mockStatusBar.localSwitch}
            </span>
          </div>
        </footer>
      </main>
    </div>
  )
}

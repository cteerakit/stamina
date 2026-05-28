import { SettingsPanel } from '@/components/settings-panel';
import { TimerControls } from '@/components/timer-controls';
import { TimerDisplay } from '@/components/timer-display';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePomodoroState } from '@/hooks/use-pomodoro-state';
import { APP_NAME, COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';

function App() {
  const { state, loading, dispatch } = usePomodoroState();

  if (loading || !state) {
    return (
      <div className="flex w-[360px] items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">{COPY.loading}</p>
      </div>
    );
  }

  const phaseTheme = isBreakPhase(state.phase) ? 'break' : 'focus';
  const timerTheme = state.settings.timerTheme;

  return (
    <div className="w-[360px] p-4">
      <header className="mb-3 text-center">
        <h1 className="text-lg font-bold tracking-tight">{APP_NAME}</h1>
        <p className="text-xs text-muted-foreground">{COPY.tagline}</p>
      </header>
      <Tabs defaultValue="timer">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timer">{COPY.tabs.arena}</TabsTrigger>
          <TabsTrigger value="settings">{COPY.tabs.loadout}</TabsTrigger>
        </TabsList>
        <TabsContent
          value="timer"
          className="mt-4 flex flex-col gap-6 rounded-xl border border-transparent p-3 -mx-1"
          data-timer-theme={timerTheme}
          data-phase={phaseTheme}
        >
          <TimerDisplay state={state} />
          <TimerControls
            state={state}
            onStartPause={() => void dispatch('START')}
            onPause={() => void dispatch('PAUSE')}
            onReset={() => void dispatch('RESET')}
            onSkip={() => void dispatch('SKIP')}
          />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <SettingsPanel timerStatus={state.status} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

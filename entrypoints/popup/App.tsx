import { AboutPanel } from '@/components/about-panel';
import { PhaseBadge } from '@/components/phase-badge';
import { ThemeSettingsPanel } from '@/components/theme-settings-panel';
import { TimerControls } from '@/components/timer-controls';
import { TimerSettingsPanel } from '@/components/timer-settings-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePomodoroState } from '@/hooks/use-pomodoro-state';
import { useSettingsForm } from '@/hooks/use-settings-form';
import { APP_NAME, COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { getColorPaletteFromSettings } from '@/lib/themes/theme-config';

function App() {
  const { state, loading, dispatch, timeLabel } = usePomodoroState();
  const settingsForm = useSettingsForm(state?.status ?? 'idle');

  if (loading || !state) {
    return (
      <div className="flex w-[360px] items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">{COPY.loading}</p>
      </div>
    );
  }

  const phaseTheme = isBreakPhase(state.phase) ? 'break' : 'focus';
  const colorPalette = getColorPaletteFromSettings(state.settings);

  return (
    <div className="w-[360px] p-4">
      <header className="mb-3 text-center">
        <h1 className="text-lg font-bold tracking-tight">{APP_NAME}</h1>
        <p className="text-xs text-muted-foreground">{COPY.tagline}</p>
      </header>
      <Tabs defaultValue="timer">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timer">{COPY.tabs.timer}</TabsTrigger>
          <TabsTrigger value="themes">{COPY.tabs.themes}</TabsTrigger>
          <TabsTrigger value="settings">{COPY.tabs.settings}</TabsTrigger>
          <TabsTrigger value="about">{COPY.tabs.about}</TabsTrigger>
        </TabsList>
        <TabsContent
          value="timer"
          className="mt-4 flex flex-col gap-6 rounded-xl border border-transparent p-3 -mx-1"
          data-color-palette={colorPalette}
          data-phase={phaseTheme}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-4xl font-semibold tracking-tight tabular-nums">
              {timeLabel}
            </p>
            <PhaseBadge phase={state.phase} />
          </div>
          <TimerControls
            state={state}
            onStartPause={() => void dispatch('START')}
            onPause={() => void dispatch('PAUSE')}
            onReset={() => void dispatch('RESET')}
            onSkip={() => void dispatch('SKIP')}
          />
        </TabsContent>
        <TabsContent value="themes" className="mt-4">
          <ThemeSettingsPanel
            form={settingsForm.form}
            onApply={settingsForm.applySettings}
          />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <TimerSettingsPanel
            form={settingsForm.form}
            timerActive={settingsForm.timerActive}
            saved={settingsForm.saved}
            hasError={settingsForm.error === 'validation'}
            onUpdateField={settingsForm.updateField}
            onShowOverlayWhenIdleChange={(showOverlayWhenIdle) =>
              void settingsForm.applySettings({ showOverlayWhenIdle })
            }
            onSave={settingsForm.saveTimerSettings}
            onReset={settingsForm.resetAllSettings}
          />
        </TabsContent>
        <TabsContent value="about" className="mt-4">
          <AboutPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

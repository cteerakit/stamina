import { Button } from '@/components/ui/button';
import { ABOUT } from '@/lib/about';
import { APP_NAME, COPY } from '@/lib/copy';

function LinkButton({ href, children }: { href: string; children: string }) {
  return (
    <Button variant="outline" className="w-full justify-center" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}

export function AboutPanel() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div>
        <p className="font-medium">{APP_NAME}</p>
        <p className="text-muted-foreground">{COPY.about.version(ABOUT.version)}</p>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {COPY.about.blurb}
        </p>
      </div>

      <div>
        <p className="font-medium">{COPY.about.madeBy}</p>
        <p className="mt-1 text-muted-foreground leading-relaxed">
          {COPY.about.authorBio(ABOUT.authorName)}
        </p>
      </div>

      <div>
        <p className="font-medium">{COPY.about.feedbackHeading}</p>
        <div className="mt-2 flex flex-col gap-2">
          <LinkButton href={ABOUT.links.feedback}>
            {COPY.about.sendFeedback}
          </LinkButton>
          <LinkButton href={ABOUT.links.issues}>
            {COPY.about.viewIssues}
          </LinkButton>
          <LinkButton href={ABOUT.links.github}>
            {COPY.about.sourceCode}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

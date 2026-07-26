"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  AlertTriangle,
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  ImageIcon,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { QuantaLoopLogo } from "@/components/QuantaLoopLogo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  launchPadLinkedInPosts,
  type LaunchPadLinkedInPost,
} from "@/data/launchpadLinkedInPosts";
import {
  launchPadImages,
  type LaunchPadImage,
} from "@/data/launchpadImages";
import { cn } from "@/lib/utils";

const generationMessages = [
  "Understanding your event experience...",
  "Organising your key learnings...",
  "Highlighting the sessions and speakers...",
  "Refining your professional tone...",
  "Preparing your LinkedIn post...",
];

function shuffledPosts(): LaunchPadLinkedInPost[] {
  const posts = [...launchPadLinkedInPosts];
  for (let index = posts.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [posts[index], posts[swapIndex]] = [posts[swapIndex], posts[index]];
  }
  return posts;
}

export async function copyPostToClipboard(post: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(post);
      return true;
    }
    const textarea = document.createElement("textarea");
    textarea.value = post;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

function copyPostSynchronously(post: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = post;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

export async function downloadLaunchPadImage(image: LaunchPadImage): Promise<void> {
  const response = await fetch(image.downloadUrl);
  if (!response.ok) throw new Error("Image download failed");
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = image.filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

function PostingSteps({ hasPost, copied, downloaded }: { hasPost: boolean; copied: boolean; downloaded: boolean }) {
  const steps = [
    { label: "Generate your post", complete: hasPost },
    { label: "Copy the post", complete: copied },
    { label: "Download an event image", complete: downloaded },
    { label: "Paste, replace placeholders and publish", complete: false },
  ];
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Publishing steps">
      {steps.map((step, index) => (
        <li key={step.label} className={cn("flex items-center gap-3 rounded-2xl border p-4 text-sm font-semibold", step.complete ? "border-cyan-200 bg-cyan-50 text-blue-950" : "border-blue-100 bg-white text-slate-600")}>
          <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", step.complete ? "bg-cyan-500 text-white" : "bg-blue-50 text-blue-700")}>
            {step.complete ? <Check size={16} /> : index + 1}
          </span>
          {step.label}
        </li>
      ))}
    </ol>
  );
}

type ImageGalleryProps = {
  selectedId: number;
  downloadingId: number | null;
  onSelect: (id: number) => void;
  onDownload: (image: LaunchPadImage) => void;
};

function LaunchPadImageGallery({ selectedId, downloadingId, onSelect, onDownload }: ImageGalleryProps) {
  return (
    <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(30,64,175,.35)] sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-blue-600">Creative</p>
      <h2 className="text-2xl font-bold text-slate-950">Choose an Event Image</h2>
      <p className="mt-2 text-sm text-slate-600">Select one creative to download and attach to your LinkedIn post.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {launchPadImages.map((image) => {
          const selected = selectedId === image.id;
          return (
            <article key={image.id} className={cn("overflow-hidden rounded-2xl border-2 bg-white transition", selected ? "border-blue-600 shadow-lg shadow-blue-100" : "border-slate-100")}>
              <button type="button" onClick={() => onSelect(image.id)} className="block w-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300" aria-pressed={selected}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                  {/* Extensionless sources are intentional: the final assets will be supplied at these routes. */}
                  <span className="absolute inset-0 grid place-items-center text-xs font-semibold text-blue-700">
                    Image will appear here when uploaded
                  </span>
                  <img
                    src={image.previewUrl}
                    alt={image.alt}
                    className="relative z-10 h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <span className={cn("absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border bg-white", selected ? "border-blue-600 text-blue-600" : "border-slate-200 text-slate-400")}>
                    {selected ? <Check size={17} /> : <ImageIcon size={16} />}
                  </span>
                </div>
                <div className="p-4 font-semibold text-slate-900">{image.title}</div>
              </button>
              <div className="px-4 pb-4">
                <Button type="button" variant="outline" className="w-full border-blue-200 text-blue-800 hover:bg-blue-50" onClick={() => onDownload(image)} disabled={downloadingId !== null}>
                  {downloadingId === image.id ? <Loader2 className="animate-spin" /> : <Download />}
                  Download
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function LaunchPadLinkedInPage() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<LaunchPadLinkedInPost[]>([]);
  const [post, setPost] = useState<LaunchPadLinkedInPost | null>(null);
  const [generating, setGenerating] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [posting, setPosting] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const renderedPost = post?.template ?? "";

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    setCopied(false);
    for (let index = 0; index < generationMessages.length; index += 1) {
      setMessageIndex(index);
      await new Promise((resolve) => window.setTimeout(resolve, 480));
    }
    let available = queue;
    if (!available.length) {
      available = shuffledPosts();
      if (post && available[0].id === post.id) {
        [available[0], available[1]] = [available[1], available[0]];
      }
    }
    const [next, ...remaining] = available;
    setQueue(remaining);
    setPost(next);
    setGenerating(false);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const copy = async () => {
    const success = await copyPostToClipboard(renderedPost);
    if (!success) {
      toast({ variant: "destructive", title: "Could not copy the post", description: "Please allow clipboard access and try again." });
      return false;
    }
    setCopied(true);
    toast({
      title: "Post copied to clipboard",
      description: "After pasting, replace all four placeholders with real LinkedIn mentions.",
    });
    window.setTimeout(() => setCopied(false), 2000);
    return true;
  };

  const download = async (image: LaunchPadImage) => {
    setSelectedId(image.id);
    setDownloadingId(image.id);
    try {
      await downloadLaunchPadImage(image);
      setDownloaded(true);
      toast({ title: "Image downloaded", description: image.filename });
    } catch {
      window.open(image.downloadUrl, "_blank", "noopener,noreferrer");
      toast({ title: "Image opened in a new tab", description: "On mobile, press and hold the image to save it." });
    } finally {
      setDownloadingId(null);
    }
  };

  const selectedImage = launchPadImages.find((image) => image.id === selectedId) ?? launchPadImages[0];

  const postToLinkedIn = async () => {
    if (posting) return;
    setPosting(true);

    // Copy while this page still owns the user gesture and browser focus.
    const copiedSynchronously = copyPostSynchronously(renderedPost);
    const copyPromise = copiedSynchronously
      ? Promise.resolve(true)
      : copyPostToClipboard(renderedPost);

    // Long posts are not sent in LinkedIn's URL because LinkedIn truncates that query.
    // Opening synchronously from the click keeps this from being blocked as a popup.
    const linkedInTab = window.open(
      "https://www.linkedin.com/feed/?shareActive=true",
      "_blank",
      "noopener,noreferrer",
    );
    const success = await copyPromise;

    if (!success) {
      toast({
        variant: "destructive",
        title: "LinkedIn opened, but the post could not be copied",
        description: "Return here, press Copy Post, then paste it manually on LinkedIn.",
      });
    } else {
      setCopied(true);
      toast({
        title: "Complete post copied — LinkedIn is opening",
        description: "Paste it, then replace all placeholders with real mentions.",
      });
      window.setTimeout(() => setCopied(false), 2000);
    }

    if (!linkedInTab) {
      toast({
        variant: "destructive",
        title: "Your browser blocked LinkedIn",
        description: "Allow pop-ups for this site, then press Post to LinkedIn again.",
      });
    }
    setPosting(false);
  };

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-950">
      <header className="border-b border-blue-100 bg-white/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3"><QuantaLoopLogo className="h-9 w-9" /><div><p className="font-bold text-blue-950">QuantaLoop</p><p className="text-xs text-slate-500">LaunchPad Series 2026</p></div></div>
          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-bold text-blue-800"><Sparkles className="mr-1 inline h-3.5 w-3.5" />AI-Style Post Assistant</span>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(#dbeafe_1px,transparent_1px),linear-gradient(90deg,#dbeafe_1px,transparent_1px)] [background-size:32px_32px]" />
        <section className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-blue-700"><Sparkles size={15} /> Profile to Product</span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-blue-950 sm:text-6xl">LaunchPad LinkedIn Post Assistant</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Generate your post, copy it, replace the marked placeholders with real LinkedIn mentions and share your LaunchPad experience.</p>
        </section>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        <PostingSteps hasPost={Boolean(post)} copied={copied} downloaded={downloaded} />

        <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 p-6 text-center text-white shadow-xl shadow-blue-200 sm:p-10" aria-live="polite">
          {generating ? (
            <div className="mx-auto max-w-lg py-4">
              <Sparkles className="mx-auto mb-5 h-10 w-10 animate-pulse text-cyan-300" />
              <p className="text-lg font-semibold">{generationMessages[messageIndex]}</p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-cyan-300 transition-all duration-500" style={{ width: `${((messageIndex + 1) / generationMessages.length) * 100}%` }} /></div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{post ? "Ready for another perspective?" : "Create your professional event post"}</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-blue-100">Only one polished post is shown at a time, with clear placeholders for LinkedIn mentions.</p>
              <Button type="button" size="lg" onClick={generate} className="mt-6 bg-cyan-300 font-bold text-blue-950 hover:bg-cyan-200"><Sparkles />{post ? "Generate Another Post" : "Generate My LinkedIn Post"}</Button>
            </>
          )}
        </section>

        {post && !generating && (
          <div ref={resultRef} className="scroll-mt-6">
            <article className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_24px_80px_-40px_rgba(30,64,175,.5)]">
              <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 sm:p-8">
                <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-700 text-white"><Sparkles /></span><div><p className="font-bold text-blue-700">Your LinkedIn Post is Ready</p><h2 className="mt-1 text-2xl font-bold text-blue-950">{post.title}</h2><span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{post.tone}</span></div></div>
              </div>
              <div className="p-5 sm:p-8">
                <div className="mb-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <p><strong>Important:</strong> After pasting on LinkedIn, replace <strong>[COLLEGE]</strong>, <strong>[SOCIETY]</strong>, <strong>[UDAY_SHARMA]</strong> and <strong>[ALOK_KUMAR]</strong> with actual LinkedIn mentions.</p>
                </div>
                <div className="whitespace-pre-wrap text-[15px] leading-7 text-slate-700 selection:bg-cyan-200">{renderedPost}</div>
                <div className="mt-6 flex gap-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500"><span>{renderedPost.trim().split(/\s+/).length} words</span><span>{renderedPost.length} characters</span></div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Button type="button" onClick={copy} variant="outline" className="!border-blue-200 !bg-white !text-blue-800 shadow-sm hover:!bg-blue-50">{copied ? <Check /> : <Clipboard />}{copied ? "Copied" : "Copy Post"}</Button>
                  <Button type="button" onClick={generate} variant="outline" className="!border-blue-200 !bg-white !text-blue-800 shadow-sm hover:!bg-blue-50"><RefreshCw />Generate Another Post</Button>
                  <Button type="button" onClick={postToLinkedIn} disabled={posting} className="!bg-[#0a66c2] !text-white shadow-sm hover:!bg-[#084e96]">{posting ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}{posting ? "Opening LinkedIn..." : "Post to LinkedIn"}</Button>
                </div>
                <p className="mt-4 text-center text-xs leading-5 text-slate-500">We’ll copy the complete post and open only LinkedIn. Paste it in the composer, then replace the placeholders with real mentions.</p>
              </div>
            </article>

            <LaunchPadImageGallery selectedId={selectedId} downloadingId={downloadingId} onSelect={setSelectedId} onDownload={download} />
            <div className="mt-5 flex justify-center">
              <Button type="button" size="lg" onClick={() => download(selectedImage)} disabled={downloadingId !== null} className="bg-blue-700 text-white hover:bg-blue-800">{downloadingId ? <Loader2 className="animate-spin" /> : <Download />}Download Selected Image</Button>
            </div>
          </div>
        )}

        <footer className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-600">
          <p className="flex gap-2 font-semibold text-blue-950"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />LinkedIn mentions must be selected inside LinkedIn itself.</p>
          <p className="mt-2 pl-7">Copy the post, paste it into LinkedIn, replace all four placeholders with the correct tagged pages or people, and attach your downloaded image.</p>
        </footer>
      </div>
    </main>
  );
}

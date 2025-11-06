import React from "react";

type ErrorBoundaryProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    try {
      // eslint-disable-next-line no-console
      console.error("Page error:", error);
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="min-h-[50vh] flex items-center justify-center text-white bg-black">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Something went wrong.</h2>
            <p className="text-sm text-white/70 mt-2">Try reloading the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}



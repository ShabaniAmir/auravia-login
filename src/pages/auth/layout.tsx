export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full shadow sm:w-fit">{children}</div>
    </div>
  );
}

export default function InfoBox({children}: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
            {children}
        </div>
    )
}
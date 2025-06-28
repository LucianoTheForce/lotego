export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          LotGo - Teste
        </h1>
        <p className="text-gray-600">
          Aplicação funcionando ✅
        </p>
        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800">
            Servidor Next.js ativo na porta 3333
          </p>
        </div>
      </div>
    </div>
  )
}
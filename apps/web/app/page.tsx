import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Note Plus</h1>
        <p className="text-lg text-muted-foreground">前端项目已启动</p>
        <p className="text-lg">
          状态: <span className="text-green-600 font-semibold">正常运行</span>
        </p>

        <div className="flex gap-4 mt-8">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </main>
  )
}

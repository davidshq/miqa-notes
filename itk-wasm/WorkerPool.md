# `itk-wasm/src/core/WorkerPool.ts`

## Imports:
- `WorkerPoolFunction`
- `WorkerPoolProgressCallback`
- `WorkerPoolRunTaskResults`

## Interface: `RunInfo`
- `taskQueue`
- `results`
- `addingTasks`
- `postponed`
- `runningWorkers`
- `index`
- `completedTasks`
- `progressCallback`
- `canceled`
- `resolve?`
- `reject?`

## Class: `WorkerPool`
- `workerQueue`
- `runInfo`
- `runTasks`
- `terminateWorkers`
- `cancel`
- `addTask`
- `clearTask`
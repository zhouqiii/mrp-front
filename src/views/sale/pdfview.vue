<template>
  <div id="pdf-view">
    <one-button type="primary" @click="pdfView">预览pdf</one-button>
    <div class="pdf-body" :style="`height: ${pageHeight}px;margin: 24px 0`">
      <iframe :src="src" width="60%" height="100%" id="pdfIframe"></iframe>
    </div>
    <canvas v-for="page in state.pdfPages" :key="page" :id="`page-${page}`" />
  </div>
</template>
<script setup lang="ts">
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer.js'
import 'pdfjs-dist/web/pdf_viewer.css'
import * as PDF from 'pdfjs-dist'

PDF.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
// 如果用responseType: blob获取到blob形式的pdf文件后，那么要根据二进制对象创造链接 pdfUrl = URL.createObjectURL(res.data)
// 文件路径
import pdfUrl from './QXCMG1L801-2024.pdf'
const PDFSource = ref('/pdfjs-3.5.141-dist/web/viewer.html')
PDF.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'

const pageHeight = ref('600')
const src = ref(`${PDFSource.value}?file=${pdfUrl}&zoom=0.65&page=3&top=500`)
let pdfDoc: any = null
const state = reactive({
  // 文件路径
  pdfPath: pdfUrl,
  // 总页数
  pdfPages: 1,
  // 页面缩放
  pdfScale: 1,
})

onMounted(() => {
  loadFile(state.pdfPath)
})

const loadFile = (url: string) => {
  PDF.getDocument({
    url,
    cMapPacked: true,
  }).promise.then((pdf) => {
    pdfDoc = pdf
    // 获取pdf文件总页数
    state.pdfPages = pdf.numPages
    nextTick(() => {
      renderPage(1) // 从第一页开始渲染
    })
  })
}
const renderPage = (num: number) => {
  pdfDoc.getPage(num).then((page: any) => {
    const canvas = <HTMLCanvasElement>document.getElementById(`page-${num}`)
    const ctx = canvas.getContext('2d')
    const viewport = page.getViewport({ scale: state.pdfScale })
    canvas.width = viewport.width
    canvas.height = viewport.height
    const renderContext = {
      canvasContext: ctx,
      viewport,
    }
    page.render(renderContext)
    // state.pdfPages 为 pdf 文件总页数
    if (num < state.pdfPages) {
      renderPage(num + 1)
    }
  })
}
const pdfView = () => {
  window.open(`${PDFSource.value}?file=${state.pdfPath}`, '_blank')
}
</script>
<style lang="scss" scoped></style>

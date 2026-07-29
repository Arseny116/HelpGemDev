import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
    static targets = ["form", "stickerId", "submitBtn"]

    subscription = null
    requestQueued = false

    listen(event) {
        event.preventDefault()

        const id = this.stickerIdTarget.value.trim()
        if (!id) return
        console.log(`Sticker ID: ${id}`)

        if (this.hasSubmitBtnTarget) {
            this.submitBtnTarget.disabled = true
            this.submitBtnTarget.value = "Генерируем PDF..."
        }

        if (this.subscription) {
            this.subscription.unsubscribe()
        }

        this.requestQueued = false

        this.subscription = consumer.subscriptions.create(
            {
                channel: "PdfDownloadChannel",
                sticker_id: id
            },
            {
                connected: async () => {
                    console.log(`[ActionCable] Успешно подключились к каналу для ID ${id}. Ожидаем файл...`)
                    if (this.requestQueued) return

                    this.requestQueued = true
                    try {
                        await this.enqueuePdfGeneration(id)
                    } catch (error) {
                        console.error("[ActionCable] Ошибка запуска генерации PDF:", error)
                        this.restoreSubmitButton()
                        if (this.subscription) this.subscription.unsubscribe()
                        alert(error.message)
                    }
                },

                received: (data) => {
                    console.log("[ActionCable] PDF готов!", data.pdf_url)

                    this.restoreSubmitButton()

                    window.location.href = data.pdf_url
                }
            }
        )
    }

    disconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

    async enqueuePdfGeneration(stickerId) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content
        const response = await fetch(this.formTarget.action, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ sticker_id: stickerId })
        })

        if (response.ok) return

        let errorMessage = "Сервер вернул ошибку при запуске генерации PDF."
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            if (data.error) errorMessage = data.error
        }

        throw new Error(errorMessage)
    }

    restoreSubmitButton() {
        if (!this.hasSubmitBtnTarget) return
        this.submitBtnTarget.disabled = false
        this.submitBtnTarget.value = "Создать PDF файл"
    }
}
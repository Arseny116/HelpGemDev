import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "name", "pillars" ]

    connect() {
        console.log("Miro Form Controller подключен!")
    }

    async submit(event) {
        event.preventDefault()

        const form = this.element
        const nameVal = this.nameTarget.value
        const pillarsVal = this.pillarsTarget.value

        const formData = new FormData(form)

        try {
            const csrfToken = form.querySelector('input[name="authenticity_token"]')?.value

            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': csrfToken,
                    'Accept': 'application/json'
                },
                body: formData
            })

            if (response.ok) {
                const textForSticky = `<strong>${nameVal}</strong><br/>Pillars: ${pillarsVal}`
                await this.createMiroSticky(textForSticky)
                form.reset()
            } else {
                alert('Сервер вернул ошибку при сохранении в БД!')
            }
        } catch (error) {
            console.error('Ошибка:', error)
            alert('Не удалось связаться с сервером Rails')
        }
    }

    async createMiroSticky(contentHtml) {
        try {

            const stickyNote = await miro.board.createStickyNote({
                content: contentHtml,
                style: {
                    fillColor: 'light_yellow',
                    textAlign: 'center',
                    textAlignVertical: 'middle',
                },
                x: 0,
                y: 0,
                shape: 'square',
                width: 200,
            })

            await miro.board.viewport.zoomTo(stickyNote)
        } catch (miroError) {
            console.error('Miro SDK Error:', miroError)
            alert('В БД сохранили, но на доске Miro стикер создать не удалось.')
        }
    }
}
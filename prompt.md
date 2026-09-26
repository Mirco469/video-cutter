https://aistudio.google.com/

> Analizza questo video ed effettua un 'Narrative Cut'. Identifica esclusivamente le sequenze cruciali per la trama principale e gli sviluppi scientifici, rimuovendo filler, gag comiche e scene slice-of-life superflue.
> Per ogni segmento individuato, aggiungi un buffer di 3 secondi prima dell'inizio e 3 secondi dopo la fine per preservare il contesto dei dialoghi e delle transizioni musicali. **Se due o più segmenti, tenendo conto dell'aggiunta dei buffer, finiscono per sovrapporsi o risultano troppo vicini, uniscili in un unico intervallo continuo.**
> Restituisci l'output esclusivamente sotto forma di array JSON di oggetti, con i timestamp convertiti in secondi totali, nel seguente formato:
> `[{"start": 0, "end": 100}, {"start": 250, "end": 400}]`
> Non aggiungere spiegazioni testuali, fornisci solo l'array pronto per l'uso in uno script Node.js.

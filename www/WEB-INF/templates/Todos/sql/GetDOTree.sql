	-- Get an ordered list of pages in an active DO tree
	SELECT doID,	dd.doID as parentID,
	doRecID,
	doRecUUID,
	dcCode,
	ddLeft,ddRight,
	p.title,
	p.slug
	FROM do
	JOIN do_do dd ON (do.doID = dd.reldoID)

	WHERE 1=1
	AND dd.drCode = 'PARENT'
	AND dd.doID = ${doID}
ORDER by ddLeft,ddRight desc
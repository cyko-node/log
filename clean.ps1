$script:nuke = (
  ".\package-lock.json",
  ".\node_modules"
)

$script:nuke.foreach({
  Write-Output "rm $_"
  Remove-Item -Force -Recurse -ErrorAction SilentlyContinue $_
})
